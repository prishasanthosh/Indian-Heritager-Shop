import { NextResponse } from 'next/server'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { vendorNotifications } from '@/lib/db/schema'
import { approvedVendorForCurrentUser } from '@/lib/vendor-auth'
export async function GET(){const access=await approvedVendorForCurrentUser();if(!access)return NextResponse.json({error:'Forbidden'},{status:403});return NextResponse.json(await db.select().from(vendorNotifications).where(eq(vendorNotifications.vendorId,access.vendor.id)).orderBy(desc(vendorNotifications.createdAt)))}