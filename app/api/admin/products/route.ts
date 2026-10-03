import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { books } from '@/lib/db/schema'

function isAdmin(email?: string | null) {
  return Boolean(email && (process.env.ADMIN_EMAILS ?? '').split(',').map((value) => value.trim().toLowerCase()).includes(email.toLowerCase()))
}

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || !isAdmin(session.user.email)) return null
  return session.user
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  return NextResponse.json(await db.select().from(books))
}

export async function POST(request: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const body = await request.json().catch(() => null)
  if (!body || typeof body.title !== 'string' || typeof body.category !== 'string') {
    return NextResponse.json({ error: 'Invalid product payload' }, { status: 400 })
  }

  const [created] = await db.insert(books).values({
    id: crypto.randomUUID(),
    title: body.title,
    author: typeof body.author === 'string' ? body.author : '',
    category: body.category,
    description: typeof body.description === 'string' ? body.description : '',
    cover: typeof body.cover === 'string' ? body.cover : '',
    price: Number(body.price ?? 0),
    stock: Number(body.stock ?? 0),
    originalPrice: body.originalPrice !== undefined ? Number(body.originalPrice) : null,
    isArchived: Boolean(body.isArchived),
    featured: Boolean(body.featured),
    active: body.active !== undefined ? Boolean(body.active) : true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning()

  return NextResponse.json(created, { status: 201 })
}

export async function PATCH(request: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const body = await request.json().catch(() => null)
  if (!body || typeof body.id !== 'string') return NextResponse.json({ error: 'Invalid product id' }, { status: 400 })
  const [updated] = await db.update(books).set({ ...body, updatedAt: new Date() }).where(eq(books.id, body.id)).returning()
  return updated ? NextResponse.json(updated) : NextResponse.json({ error: 'Product not found' }, { status: 404 })
}

export async function DELETE(request: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const id = request.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Product id is required' }, { status: 400 })
  await db.delete(books).where(eq(books.id, id))
  return NextResponse.json({ ok: true })
}
