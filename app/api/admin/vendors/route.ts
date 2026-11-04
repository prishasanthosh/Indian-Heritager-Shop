import { NextRequest, NextResponse } from 'next/server'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/lib/db'
import { marketplaceAuditLog, vendorNotifications, vendorProfiles } from '@/lib/db/schema'
import { currentAdministrator } from '@/lib/vendor-auth'
import { decryptVendorValue, VendorDataConfigurationError } from '@/lib/vendor-security'

export async function GET(){
  const admin=await currentAdministrator()
  if(!admin)return NextResponse.json({error:'Forbidden'},{status:403})
  try {
    const vendors=await db.select().from(vendorProfiles).orderBy(desc(vendorProfiles.createdAt))
    return NextResponse.json(vendors.map(v=>{const {gstNumberEncrypted,panNumberEncrypted,bankHolderEncrypted,bankAccountEncrypted,ifscEncrypted,...safe}=v;return {...safe,verification:{gstNumber:decryptVendorValue(gstNumberEncrypted),panNumber:decryptVendorValue(panNumberEncrypted),bankHolder:decryptVendorValue(bankHolderEncrypted),bankAccount:decryptVendorValue(bankAccountEncrypted),ifsc:decryptVendorValue(ifscEncrypted)}}}))
  } catch (error) {
    console.error(error instanceof VendorDataConfigurationError ? error.message : 'Unable to decrypt vendor verification data.')
    return NextResponse.json({error:'Vendor verification data is unavailable because server encryption configuration is missing or invalid.'},{status:500})
  }
}
const schema=z.object({id:z.string(),action:z.enum(['approve','reject','suspend','reactivate']),reason:z.string().max(1000).optional()})
export async function POST(request:NextRequest){const admin=await currentAdministrator();if(!admin)return NextResponse.json({error:'Forbidden'},{status:403});const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:'Invalid vendor action.'},{status:400});const status=parsed.data.action==='approve'||parsed.data.action==='reactivate'?'approved':parsed.data.action==='reject'?'rejected':'suspended';await db.update(vendorProfiles).set({status,rejectionReason:parsed.data.reason??null,updatedAt:new Date()}).where(eq(vendorProfiles.id,parsed.data.id));
  const type = status==='approved' ? 'application_approved' : status==='rejected' ? 'application_rejected' : 'vendor_suspended'
  await db.insert(vendorNotifications).values({id:crypto.randomUUID(),vendorId:parsed.data.id,type,title:`Vendor application ${status}`,message:parsed.data.reason??`Your vendor account status changed to ${status}.`})
  await db.insert(marketplaceAuditLog).values({id:crypto.randomUUID(),actorUserId:admin.id,vendorId:parsed.data.id,action:`vendor.${parsed.data.action}`,details:parsed.data.reason??''})
  return NextResponse.json({ok:true})}
