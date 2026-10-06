import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { newsletterSubscribers } from '@/lib/db/schema'

const subscriptionSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
})

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
  }

  const parsed = subscriptionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
  }

  try {
    await db.insert(newsletterSubscribers)
      .values({ email: parsed.data.email })
      .onConflictDoNothing()

    return NextResponse.json({ subscribed: true })
  } catch (error) {
    console.error('Unable to save newsletter subscription.', error)
    return NextResponse.json({ error: 'Unable to save your subscription right now.' }, { status: 500 })
  }
}
