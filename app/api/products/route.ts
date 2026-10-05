import { NextRequest, NextResponse } from 'next/server'
import { and, asc, desc, eq, ilike, notIlike, or, sql, type SQL } from 'drizzle-orm'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema'

const PAGE_SIZE = 24

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const page = Math.max(1, Number(params.get('page') ?? '1') || 1)
  const query = params.get('q')?.trim() ?? ''
  const ids = params.get('ids')?.split(',').map((id) => id.trim()).filter(Boolean) ?? []
  const category = params.get('category')?.trim() ?? ''
  const sort = params.get('sort') ?? 'featured'

  const filters: SQL[] = [eq(products.isArchived, false), notIlike(products.category, 'books')]

  if (ids.length) filters.push(sql`${products.id} in ${ids}`)

  if (query) {
    const searchFilter = or(
      ilike(products.title, `%${query}%`),
      ilike(products.author, `%${query}%`),
      ilike(products.category, `%${query}%`),
      ilike(products.brand, `%${query}%`),
      ilike(products.sku, `%${query}%`),
    )

    if (searchFilter) filters.push(searchFilter)
  }

  if (category && category !== 'All products') filters.push(eq(products.category, category))

  const orderBy =
    sort === 'price-asc'
      ? asc(products.price)
      : sort === 'price-desc'
        ? desc(products.price)
        : sort === 'rating'
          ? desc(products.rating)
          : desc(products.createdAt)

  const rows = await db.select().from(products)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(orderBy)
    .limit(PAGE_SIZE)
    .offset((page - 1) * PAGE_SIZE)

  return NextResponse.json({ products: rows, page, pageSize: PAGE_SIZE, hasMore: rows.length === PAGE_SIZE })
}
