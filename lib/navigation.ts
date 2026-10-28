export type NavigationSection = {
  label: string
  items: string[]
}

export type MegaMenuCategory = {
  label: string
  href: string
  columns: NavigationSection[]
}

export type MainNavigationCategory = {
  label: string
  href: string
  megaMenu?: MegaMenuCategory
}

const productsHref = (category: string, subcategory?: string) => {
  const params = new URLSearchParams({ category })
  if (subcategory) params.set('subcategory', subcategory)
  return `/products?${params.toString()}`
}

const megaMenu = (label: string, category: string, columns: NavigationSection[]): MegaMenuCategory => ({
  label,
  href: productsHref(category),
  columns,
})

export const kidsMenu = megaMenu('Kids', 'clothing', [
  { label: 'ACCESSORIES', items: ['Mufflers & Scarves', 'Gloves', 'Rings', 'Face Masks', 'Hairbands & Clips', 'Cap', 'Socks'] },
  { label: 'BOYS ETHNIC WEAR', items: ['Dhotis', 'Lungis', 'Kurtas', 'Pajama', 'Kurta Pajama Set'] },
  { label: 'BOYS WESTERN WEAR', items: ['Shirt', 'Trousers', 'Jackets & Coats'] },
  { label: 'GIRLS ETHNIC WEAR', items: ['Kurtis', 'Salwar Suits', 'Stoles, Chunnis & Dupattas', 'Lehenga Cholis'] },
  { label: 'GIRLS WESTERN WEAR', items: ['Jackets & Coats', 'Skirts', 'Frocks', 'Sets & Suits'] },
  { label: 'KIDS FOOTWEAR', items: ['Shoes'] },
  { label: 'FOOTWEAR', items: ['Sandals & Floaters', 'Shoes'] },
  { label: 'TOYS AND GAMES', items: ['Toys for Kids'] },
])

export const womenMenu = megaMenu('Women', 'clothing', [
  { label: 'WOMEN ETHNIC WEAR', items: ['Sarees', 'Dress Materials', 'Kurtis', 'Shawls', 'Kurta Set', 'Stoles, Chunnis & Dupattas', 'Lehenga Cholis', 'Blouse', 'Wraparound', 'Top Skirt Set', 'Pants', 'Palazzo'] },
  { label: 'WESTERN WEAR', items: ['Jackets & Coats', 'Skirts', 'Dress', 'Tops', 'Shirt'] },
  { label: 'ACCESSORIES', items: ['Mufflers & Scarves', 'Chains & Necklaces', 'Bangles & Bracelets', 'Earrings', 'Pendants', 'Nose rings & pins', 'Hairbands & Clips', 'Ladies Belt', 'Jewelry Box', 'Socks'] },
  { label: 'BAGS', items: ['Bags', 'Office Bags', 'Pouch', 'Purse', 'Shopping Bag', 'Slings', 'Tote Bags', 'Potli'] },
  { label: 'FOOTWEAR', items: ['Ethnic Footwears', 'Shoes'] },
])

export const menMenu = megaMenu('Men', 'clothing', [
  { label: 'ETHNIC WEAR', items: ['Shawls', 'Dhoti', 'Lungi', 'Kurtas', 'Pajama', 'Kurta Pajama Set', 'Running Fabric'] },
  { label: 'WESTERN WEAR', items: ['Shirt', 'Jackets & Coats'] },
  { label: 'ACCESSORIES', items: ['Mufflers & Scarves', 'Belts', 'Wallets', 'Cuff Links', 'Hand Kerchiefs', 'Pouches & Toiletries', 'Hats', 'Gamchha', 'Socks'] },
  { label: 'FOOTWEARS', items: ['Ethnic Footwears', 'Slipper / Chappal'] },
])

export const furnitureMenu = megaMenu('Furniture', 'home-decor', [
  { label: 'HOME OUTDOORS', items: ['Patio Chairs', 'Patio Sofas', 'Sun Loungers', 'Swings & Accessories'] },
  { label: 'HOME INDOOR', items: ['Bedside Tables', 'Dining Tables'] },
  { label: 'OFFICES', items: ['Cabinets', 'Chairs', 'Magazines & Newspaper Racks', 'Sofa Sets', 'Sofas & Couches'] },
])

export const navigationCategories: MainNavigationCategory[] = [
  { label: kidsMenu.label, href: kidsMenu.href, megaMenu: kidsMenu },
  { label: womenMenu.label, href: womenMenu.href, megaMenu: womenMenu },
  { label: menMenu.label, href: menMenu.href, megaMenu: menMenu },
  { label: 'Handicrafts', href: '/products?category=handicrafts' },
  { label: 'Home & Living', href: '/products?category=home-decor' },
  { label: 'Accessories', href: '/products?category=accessories' },
  { label: 'Art & Collectibles', href: '/products?category=art-collectibles' },
  { label: furnitureMenu.label, href: furnitureMenu.href, megaMenu: furnitureMenu },
  { label: 'GI Tagged', href: '/gi-tagged' },
]

export function subcategoryHref(category: string, subcategory: string) {
  return productsHref(category, subcategory)
}
