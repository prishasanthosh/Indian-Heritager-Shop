import type { Config } from 'drizzle-kit'

export default {
  dialect: 'postgresql',
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/indian_heritager_shop',
  },
  verbose: true,
  strict: true,
} satisfies Config
