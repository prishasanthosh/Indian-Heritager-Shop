import { createHash } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { approvedVendorForCurrentUser } from '@/lib/vendor-auth'

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

export async function POST(request: NextRequest) {
  const access = await approvedVendorForCurrentUser()
  if (!access) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!cloudName || !apiKey || !apiSecret) return NextResponse.json({ error: 'Image storage is not configured.' }, { status: 503 })
  const file = (await request.formData()).get('image')
  if (!(file instanceof File)) return NextResponse.json({ error: 'Choose an image to upload.' }, { status: 400 })
  if (!allowedTypes.has(file.type)) return NextResponse.json({ error: 'Use a JPEG, PNG, or WebP image.' }, { status: 400 })
  if (file.size === 0 || file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'The image must be smaller than 5 MB.' }, { status: 400 })
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const folder = 'indian-heritager/vendor-products'
  const signature = createHash('sha1').update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest('hex')
  const uploadData = new FormData()
  uploadData.append('file', file)
  uploadData.append('api_key', apiKey)
  uploadData.append('timestamp', timestamp)
  uploadData.append('folder', folder)
  uploadData.append('signature', signature)
  const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`, { method: 'POST', body: uploadData, signal: AbortSignal.timeout(30_000) })
  const data = await response.json() as { secure_url?: string }
  if (!response.ok || !data.secure_url) return NextResponse.json({ error: 'The image could not be saved.' }, { status: 502 })
  return NextResponse.json({ url: data.secure_url })
}
