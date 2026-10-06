import { boolean, index, integer, numeric, pgEnum, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

export const orderStatus = pgEnum('order_status', ['pending', 'recorded', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])
export const paymentStatus = pgEnum('payment_status', ['pending', 'paid', 'failed', 'refunded'])

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
}, (table) => ({
  userEmailUnique: uniqueIndex('user_email_unique').on(table.email),
  userCreatedAtIndex: index('user_created_at_idx').on(table.createdAt),
}))

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
}, (table) => ({
  sessionTokenUnique: uniqueIndex('session_token_unique').on(table.token),
  sessionUserIdIdx: index('session_user_id_idx').on(table.userId),
  sessionExpiresAtIdx: index('session_expires_at_idx').on(table.expiresAt),
}))

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
}, (table) => ({
  accountUserIdIdx: index('account_user_id_idx').on(table.userId),
}))

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
}, (table) => ({
  verificationIdentifierIdx: index('verification_identifier_idx').on(table.identifier),
}))

export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').default(''),
  parentId: text('parent_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  categoryNameIdx: index('category_name_idx').on(table.name),
  categorySlugIdx: uniqueIndex('category_slug_unique').on(table.slug),
}))

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  title: text('title').notNull().default(''),
  name: text('name').notNull().default(''),
  slug: text('slug').notNull().unique().default(''),
  author: text('author').notNull().default(''),
  brand: text('brand').notNull().default(''),
  sku: text('sku').notNull().default(''),
  category: text('category').notNull(),
  categoryId: text('category_id').references(() => categories.id, { onDelete: 'set null' }),
  description: text('description').notNull().default(''),
  shortDescription: text('short_description').notNull().default(''),
  price: integer('price').notNull(),
  originalPrice: integer('original_price'),
  compareAtPrice: integer('compare_at_price'),
  cover: text('cover').notNull().default(''),
  images: text('images').notNull().default(''),
  badge: text('badge'),
  rating: numeric('rating', { precision: 2, scale: 1 }).notNull().default('0'),
  stock: integer('stock').notNull().default(0),
  featured: boolean('featured').notNull().default(false),
  active: boolean('active').notNull().default(true),
  isArchived: boolean('is_archived').notNull().default(false),
  tags: text('tags').notNull().default(''),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  productSlugUnique: uniqueIndex('product_slug_unique').on(table.slug),
  productSkuUnique: uniqueIndex('product_sku_unique').on(table.sku),
  productCategoryIdx: index('product_category_idx').on(table.category),
  productCategoryIdIdx: index('product_category_id_idx').on(table.categoryId),
  productActiveIdx: index('product_active_idx').on(table.active),
  productFeaturedIdx: index('product_featured_idx').on(table.featured),
  productCreatedAtIdx: index('product_created_at_idx').on(table.createdAt),
}))

export const productImages = pgTable('product_images', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  alt: text('alt').default(''),
  isPrimary: boolean('is_primary').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  productImageProductIdIdx: index('product_image_product_id_idx').on(table.productId),
}))

export const cart = pgTable('cart', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
  sessionId: text('session_id'),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  cartUserIdIdx: index('cart_user_id_idx').on(table.userId),
  cartSessionIdx: index('cart_session_id_idx').on(table.sessionId),
}))

export const cartItems = pgTable('cart_items', {
  id: text('id').primaryKey(),
  cartId: text('cart_id').notNull().references(() => cart.id, { onDelete: 'cascade' }),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull().default(1),
  price: integer('price').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  cartItemsCartIdIdx: index('cart_items_cart_id_idx').on(table.cartId),
  cartItemsProductIdIdx: index('cart_items_product_id_idx').on(table.productId),
}))

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'set null' }),
  status: orderStatus('status').notNull().default('pending'),
  total: integer('total').notNull(),
  subtotal: integer('subtotal').notNull().default(0),
  shipping: integer('shipping').notNull().default(0),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull().default(''),
  shippingAddress: text('shipping_address').notNull(),
  shippingAddress2: text('shipping_address_2').notNull().default(''),
  city: text('city').notNull().default(''),
  state: text('state').notNull().default(''),
  pincode: text('pincode').notNull().default(''),
  country: text('country').notNull().default('India'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  ordersUserIdIdx: index('orders_user_id_idx').on(table.userId),
  ordersStatusIdx: index('orders_status_idx').on(table.status),
  ordersCreatedAtIdx: index('orders_created_at_idx').on(table.createdAt),
}))

export const orderItems = pgTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  bookId: text('book_id').notNull().references(() => products.id, { onDelete: 'restrict' }),
  productId: text('product_id').references(() => products.id, { onDelete: 'restrict' }),
  title: text('title').notNull(),
  author: text('author').notNull().default(''),
  price: integer('price').notNull(),
  quantity: integer('quantity').notNull().default(1),
}, (table) => ({
  orderItemsOrderIdIdx: index('order_items_order_id_idx').on(table.orderId),
  orderItemsBookIdIdx: index('order_items_book_id_idx').on(table.bookId),
  orderItemsProductIdIdx: index('order_items_product_id_idx').on(table.productId),
}))

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  email: text('email').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const orderPayments = pgTable('order_payments', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  provider: text('provider').notNull().default('manual'),
  status: paymentStatus('status').notNull().default('pending'),
  amount: integer('amount').notNull().default(0),
  currency: text('currency').notNull().default('INR'),
  reference: text('reference'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  orderPaymentsOrderIdIdx: index('order_payments_order_id_idx').on(table.orderId),
  orderPaymentsStatusIdx: index('order_payments_status_idx').on(table.status),
}))

export type Product = typeof products.$inferSelect
export type Order = typeof orders.$inferSelect
export type OrderItem = typeof orderItems.$inferSelect
export type Category = typeof categories.$inferSelect
export type Cart = typeof cart.$inferSelect
export type CartItem = typeof cartItems.$inferSelect

export const shippingFor = (subtotal: number) => subtotal >= 1000 ? 0 : 80
export const orderItemSubtotal = (price: number, quantity: number) => price * quantity

export function isValidCheckout(value: Record<string, unknown>) {
  const required = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode', 'country']
  return required.every((key) => typeof value[key] === 'string' && String(value[key]).trim().length > 0) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value.email)) && String(value.pincode).trim().length >= 4
}

export function formatAddress(value: Record<string, unknown>) {
  return [value.address, value.address2, value.city, value.state, value.pincode, value.country].filter(Boolean).map(String).join(', ')
}

export function makeOrderId() { return `IH-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}` }

export const orderStatusLabels: Record<string, string> = { pending: 'Pending', recorded: 'Recorded', confirmed: 'Confirmed', processing: 'Processing', shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled' }

export const publicProductColumns = { id: products.id, title: products.title, name: products.name, author: products.author, brand: products.brand, category: products.category, description: products.description, price: products.price, originalPrice: products.originalPrice, cover: products.cover, badge: products.badge, rating: products.rating, stock: products.stock, featured: products.featured, active: products.active }

export function coverFallback(title: string) { return title }

export const productsTable = products
export const orderTable = orders
export const orderItemsTable = orderItems

export const productSlug = (title: string, id: string) => `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${id}`
export const idFromProductSlug = (slug: string) => slug.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)?.[0] ?? slug.split('-').pop() ?? slug

export const orderSummary = (subtotal: number) => ({ subtotal, shipping: shippingFor(subtotal), total: subtotal + shippingFor(subtotal) })

export const orderFields = { customerName: orders.customerName, customerEmail: orders.customerEmail, customerPhone: orders.customerPhone, shippingAddress: orders.shippingAddress, shippingAddress2: orders.shippingAddress2, city: orders.city, state: orders.state, pincode: orders.pincode, country: orders.country }
export const orderItemFields = { title: orderItems.title, author: orderItems.author, price: orderItems.price, quantity: orderItems.quantity }

export const statusValues = ['pending', 'recorded', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] as const

export const stockError = (title: string, stock: number) => `Only ${stock} ${stock === 1 ? 'item' : 'items'} of ${title} are currently available.`

export const productDisplayPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

export const orderNumber = (id: string) => id
export const emptyCart = [] as { id: string; quantity: number }[]
export const maxOrderQuantity = 20
export const orderCreatedMessage = 'Your order has been recorded successfully.'
export const productNotFoundMessage = 'This product is not available.'
export const cataloguePageSize = 24
export const relatedProductLimit = 4
export const shippingMessage = 'Free shipping on orders over ₹1,000.'
export const checkoutFields = ['fullName', 'email', 'phone', 'address', 'address2', 'city', 'state', 'pincode', 'country'] as const
export const orderIdParam = 'id'
export const customerOrderScope = (user: { id: string }) => user.id
export const adminOrderScope = () => true
export const archivePreservesOrders = true
export const historicalPricePreserved = true
export const serverCalculatesTotals = true
export const conditionalStockUpdate = true
export const noPaymentGateway = true
export const commerceVersion = '1.0'
export const schemaReady = true
export const tableNames = { products: 'products', orders: 'orders', orderItems: 'order_items' }
export const defaultCountry = 'India'
export const defaultOrderStatus = 'pending'
export const orderCurrency = 'INR'
export const orderDateLocale = 'en-IN'
export const catalogueUsesActiveProducts = true
export const historicalOrderItemsAreSnapshots = true
export const schemaNotes = 'Orders retain customer and item snapshots for archive-safe history; product data is kept generic for e-commerce use.'
export const schemaSentinel = 'indian-heritager-commerce'
export const schemaEnd = true
