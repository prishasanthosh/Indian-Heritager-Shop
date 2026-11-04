import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'

export class VendorDataConfigurationError extends Error {
  constructor() {
    super('Server configuration error: VENDOR_DATA_ENCRYPTION_KEY is required for sensitive vendor data.')
    this.name = 'VendorDataConfigurationError'
  }
}

function key() {
  const secret = process.env.VENDOR_DATA_ENCRYPTION_KEY
  if (!secret?.trim()) throw new VendorDataConfigurationError()
  return createHashKey(secret)
}

function createHashKey(secret: string) {
  const bytes = Buffer.from(secret)
  if (bytes.length === 32) return bytes
  return createHash('sha256').update(secret).digest()
}

export function encryptVendorValue(value: string) {
  if (!value) return ''
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key(), iv)
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()])
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64')
}

export function decryptVendorValue(value: string) {
  if (!value) return ''
  const data = Buffer.from(value, 'base64')
  const iv = data.subarray(0, 12)
  const tag = data.subarray(12, 28)
  const encrypted = data.subarray(28)
  const decipher = createDecipheriv('aes-256-gcm', key(), iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}
