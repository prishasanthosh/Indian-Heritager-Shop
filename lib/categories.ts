export type ProductCategory = {
  name: string
  slug: string
  value: string
}

export const productCategories: ProductCategory[] = [
  { name: 'Books', slug: 'books', value: 'Books' },
  { name: 'Clothing', slug: 'clothing', value: 'Clothing' },
  { name: 'Handicrafts', slug: 'handicrafts', value: 'Handicrafts' },
  { name: 'Home Decor', slug: 'home-decor', value: 'Home Decor' },
  { name: 'Jewellery', slug: 'jewellery', value: 'Jewellery' },
  { name: 'Accessories', slug: 'accessories', value: 'Accessories' },
  { name: 'Gifts', slug: 'gifts', value: 'Gifts' },
  { name: 'Art & Collectibles', slug: 'art-collectibles', value: 'Art & Collectibles' },
  { name: 'Traditional Products', slug: 'traditional-products', value: 'Traditional Products' },
  { name: 'Other Products', slug: 'other-products', value: 'Other Products' },
]

export const bookCategories = productCategories

export function getCategoryBySlug(slug: string | null) {
  return productCategories.find((category) => category.slug === slug)
}

export function productsHref(slug?: string) {
  return slug ? `/products?category=${encodeURIComponent(slug)}` : '/products'
}

export function booksHref(slug?: string) {
  return productsHref(slug)
}
