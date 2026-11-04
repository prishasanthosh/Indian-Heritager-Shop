import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { vendorNotifications, vendorProfiles } from '@/lib/db/schema'
import { encryptVendorValue, VendorDataConfigurationError } from '@/lib/vendor-security'

const schema = z.object({
  storeName: z.string().trim().min(2).max(120), phone: z.string().trim().min(7).max(20),
  description: z.string().trim().min(20).max(3000), businessType: z.string().trim().min(2).max(100),
  businessAddress: z.string().trim().min(5).max(300), city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(80), pincode: z.string().trim().min(4).max(12), country: z.string().trim().min(2).max(80),
  gstNumber: z.string().trim().max(30).default(''), panNumber: z.string().trim().max(30).default(''),
  bankHolder: z.string().trim().min(2).max(120).default(''), bankAccount: z.string().trim().min(6).max(30).default(''), ifsc: z.string().trim().min(4).max(20).default(''),
})
const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'store'

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) return NextResponse.json({ error: 'Please sign in before applying.' }, { status: 401 })
    const parsed = schema.safeParse(await request.json())
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Please check the application details.' }, { status: 400 })
    const existing = await db.query.vendorProfiles.findFirst({ where: eq(vendorProfiles.userId, session.user.id) })
    if (existing) return NextResponse.json({ id: existing.id, status: existing.status, alreadyApplied: true })
    let baseSlug = slug(parsed.data.storeName), candidate = baseSlug, suffix = 1
    while (await db.query.vendorProfiles.findFirst({ where: eq(vendorProfiles.storeSlug, candidate) })) candidate = `${baseSlug}-${++suffix}`
    const id = crypto.randomUUID()
    await db.insert(vendorProfiles).values({ id, userId: session.user.id, status: 'pending', storeName: parsed.data.storeName, storeSlug: candidate,
      contactName: session.user.name, phone: parsed.data.phone, description: parsed.data.description, businessType: parsed.data.businessType,
      businessAddress: parsed.data.businessAddress, city: parsed.data.city, state: parsed.data.state, pincode: parsed.data.pincode, country: parsed.data.country,
      gstNumberEncrypted: encryptVendorValue(parsed.data.gstNumber), panNumberEncrypted: encryptVendorValue(parsed.data.panNumber), bankHolderEncrypted: encryptVendorValue(parsed.data.bankHolder),
      bankAccountEncrypted: encryptVendorValue(parsed.data.bankAccount), ifscEncrypted: encryptVendorValue(parsed.data.ifsc) })
    await db.insert(vendorNotifications).values({ id: crypto.randomUUID(), vendorId: id, type: 'application_submitted', title: 'Application submitted', message: 'Your vendor application is awaiting administrator review.' })
    return NextResponse.json({ id, status: 'pending' })
  } catch (error) {
    if (error instanceof VendorDataConfigurationError) console.error(error.message)
    else console.error('Vendor application failed')
    return NextResponse.json({ error: 'Unable to submit application because sensitive vendor data could not be secured.' }, { status: 500 })
  }
}
