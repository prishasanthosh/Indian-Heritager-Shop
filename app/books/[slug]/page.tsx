import { redirect } from 'next/navigation'

export default function LegacyProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  void params
  redirect('/products')
}

