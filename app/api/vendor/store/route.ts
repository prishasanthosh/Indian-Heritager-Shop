import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { vendorProfiles } from '@/lib/db/schema'
import { approvedVendorForCurrentUser } from '@/lib/vendor-auth'

const schema=z.object({storeName:z.string().trim().min(2).max(120),description:z.string().trim().max(3000),businessAddress:z.string().trim().max(300),city:z.string().trim().max(80),state:z.string().trim().max(80),pincode:z.string().trim().max(12),country:z.string().trim().max(80),phone:z.string().trim().max(20),logo:z.string().trim().max(2000),banner:z.string().trim().max(2000),website:z.string().trim().max(300),instagram:z.string().trim().max(300),facebook:z.string().trim().max(300)})
export async function GET(){const access=await approvedVendorForCurrentUser(); if(!access)return NextResponse.json({error:'Forbidden'},{status:403}); const {id,userId,status,gstNumberEncrypted,panNumberEncrypted,bankHolderEncrypted,bankAccountEncrypted,ifscEncrypted,...store}=access.vendor; return NextResponse.json(store)}
export async function PATCH(request:NextRequest){const access=await approvedVendorForCurrentUser();if(!access)return NextResponse.json({error:'Forbidden'},{status:403});const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:'Please check your store details.'},{status:400});await db.update(vendorProfiles).set({...parsed.data,updatedAt:new Date()}).where(eq(vendorProfiles.id,access.vendor.id));return NextResponse.json({ok:true})}
