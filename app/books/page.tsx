import { redirect } from 'next/navigation'

export default function LegacyBooksPage() {
  redirect('/products')
  return null
}
