import type { Metadata } from 'next'
import { PolicyContact, PolicyPage, PolicySection } from '@/components/policy-page'

export const metadata: Metadata = {
  title: 'Shipping & Delivery | Indian Heritager',
  description: 'Read Indian Heritager shipping, packaging, dispatch and delivery policies.',
  alternates: { canonical: '/shipping-policy' },
}

export default function ShippingPolicyPage() {
  return (
    <PolicyPage title="Shipping & Delivery Policy" introduction={<p>IndianHeritager.com works with independent vendors across India to bring authentic products, traditional craftsmanship and unique Indian products to customers. Orders may be fulfilled directly by registered vendors or, where applicable, through an optional centralised fulfilment arrangement.</p>}>
      <PolicySection title="Order Processing">
        <p>Once an order is successfully placed:</p>
        <ol className="list-decimal space-y-1 pl-6"><li>The order is recorded on the marketplace.</li><li>The relevant vendor receives an order notification.</li><li>The vendor is expected to acknowledge the order within 24 hours.</li><li>The vendor prepares and packs the product.</li><li>The product is dispatched.</li><li>Tracking information is updated where available.</li></ol>
      </PolicySection>
      <PolicySection title="Dispatch Timelines">
        <ul className="list-disc space-y-1 pl-6"><li>Standard products are ordinarily dispatched within 2–3 business days.</li><li>Made-to-Order and customised products follow their specified production and dispatch timelines.</li><li>Vendors must communicate dispatch delays to Indian Heritager.</li></ul>
      </PolicySection>
      <PolicySection title="Packaging">
        <p>Vendors are responsible for ensuring that products are securely packed before dispatch and that packaging is appropriate for the product and transport requirements.</p>
        <p>Fragile products must have adequate protective cushioning. Weather-resistant and tamper-evident packaging should be used where appropriate.</p>
      </PolicySection>
      <PolicySection title="Shipping and Delivery Timelines">
        <p>Delivery timelines depend on vendor location, customer delivery address, product availability, manufacturing or production requirements, courier availability and other operational circumstances.</p>
        <p>Delivery estimates are indicative and may be affected by weather, public holidays, courier disruptions, remote locations and circumstances beyond reasonable control.</p>
      </PolicySection>
      <PolicySection title="Order Tracking">
        <p>Where tracking information is available, customers can use the tracking details provided through their account or order communication.</p>
      </PolicySection>
      <PolicySection title="Delivery Delays">
        <p>Customers should contact customer support if an order is delayed, tracking information is unavailable or a delivery issue occurs.</p>
      </PolicySection>
      <PolicySection title="Undelivered Orders">
        <p>If an order cannot be delivered, it may be returned to the vendor as Return to Origin (RTO). Applicable reverse logistics charges and settlement adjustments are handled according to the relevant vendor agreement.</p>
      </PolicySection>
      <PolicySection title="Contact"><PolicyContact /></PolicySection>
    </PolicyPage>
  )
}
