import { Armchair, Baby, Gift, Gem, House, Landmark, Package, Palette, Shirt, ShoppingBag, Sparkles, UserRound, Wrench, type LucideIcon } from 'lucide-react'

const categoryArtwork: Record<string, { Icon: LucideIcon; background: string }> = {
  kids: { Icon: Baby, background: 'from-[#9a6854] to-[#513331]' },
  women: { Icon: ShoppingBag, background: 'from-[#985d62] to-[#552b34]' },
  men: { Icon: UserRound, background: 'from-[#7e5c50] to-[#39343a]' },
  furniture: { Icon: Armchair, background: 'from-[#82684f] to-[#403b34]' },
  'gi-tagged': { Icon: Landmark, background: 'from-[#927044] to-[#553b2f]' },
  'home-living': { Icon: House, background: 'from-[#827053] to-[#3d3a2f]' },
  clothing: { Icon: Shirt, background: 'from-[#8b5545] to-[#4c2827]' },
  handicrafts: { Icon: Wrench, background: 'from-[#9b6842] to-[#503326]' },
  'home-decor': { Icon: House, background: 'from-[#827053] to-[#3d3a2f]' },
  jewellery: { Icon: Gem, background: 'from-[#806047] to-[#402a35]' },
  accessories: { Icon: Sparkles, background: 'from-[#7d594a] to-[#382b31]' },
  gifts: { Icon: Gift, background: 'from-[#995d4b] to-[#512d32]' },
  'art-collectibles': { Icon: Palette, background: 'from-[#826345] to-[#3c3036]' },
  'traditional-products': { Icon: Package, background: 'from-[#93684a] to-[#48342c]' },
  'other-products': { Icon: Sparkles, background: 'from-[#77664f] to-[#37322d]' },
}

export function CategoryArtwork({ category, className = '' }: { category: string; className?: string }) {
  const { Icon, background } = categoryArtwork[category] ?? categoryArtwork['other-products']

  return (
    <div aria-hidden="true" className={`grid place-items-center bg-gradient-to-br ${background} ${className}`}>
      <Icon size={38} strokeWidth={1.4} className="text-[#fff7e9]" />
    </div>
  )
}
