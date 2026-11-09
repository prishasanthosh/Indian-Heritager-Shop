import { betterAuth } from 'better-auth'
import { pool } from '@/lib/db'
import { BOOKSTORE_ORIGIN, VENDOR_PORTAL_ORIGIN } from '@/lib/site-urls'

const runtimeOrigins = [
  process.env.V0_RUNTIME_URL,
  process.env.V0_DEV_APP_URL,
  process.env.V0_BUILD_URL,
  process.env.V0_SANDBOX_URL,
]

const trustedOrigins = [
  BOOKSTORE_ORIGIN,
  VENDOR_PORTAL_ORIGIN,
  process.env.BETTER_AUTH_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000', ...runtimeOrigins] : []),
].filter((origin): origin is string => Boolean(origin))

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  database: pool,
  baseURL: process.env.BETTER_AUTH_URL
    ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.V0_RUNTIME_URL)
    ?? BOOKSTORE_ORIGIN,
  emailAndPassword: { enabled: true, autoSignIn: true },
  trustedOrigins: [...new Set(trustedOrigins)],
  session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24 },
})
