import type { Metadata } from 'next'
import { PolicyContact, PolicyPage, PolicySection } from '@/components/policy-page'

export const metadata: Metadata = {
  title: 'Returns & Refunds | Indian Heritager',
  description: 'Review Indian Heritager return, replacement and refund eligibility and process.',
  alternates: { canonical: '/return-refund-policy' },
}

export default function ReturnRefundPolicyPage() {
  return (
    <PolicyPage title="Returns, Refunds & Replacements" introduction={<p>At Indian Heritager, we aim to provide customers with a reliable and satisfactory shopping experience. If a product arrives damaged, defective, incorrect or materially different from its approved description, customers may request a return or replacement under this policy.</p>}>
      <PolicySection title="Return Window"><p>Eligible products may be returned within 7 days from the date of delivery. Customers should initiate a return request within this period.</p></PolicySection>
      <PolicySection title="Eligible Return Reasons">
        <ul className="list-disc space-y-1 pl-6"><li>Damaged products.</li><li>Defective products.</li><li>Incorrect products delivered.</li><li>Products that materially differ from their descriptions.</li><li>Missing items or incorrect quantities.</li><li>Other eligible circumstances under applicable law.</li></ul>
      </PolicySection>
      <PolicySection title="Non-Returnable Products">
        <p>The following products may be excluded from ordinary change-of-mind returns where legally permitted:</p>
        <ul className="list-disc space-y-1 pl-6"><li>Perishable food products.</li><li>Personalised products.</li><li>Customised and Made-to-Order products.</li><li>Certain hygiene-sensitive products.</li></ul>
        <p>These exclusions do not affect statutory consumer rights relating to defective, damaged, spurious or incorrectly described products.</p>
      </PolicySection>
      <PolicySection title="How to Request a Return">
        <ol className="list-decimal space-y-1 pl-6"><li>Log in to your Indian Heritager account.</li><li>Open the relevant order.</li><li>Contact customer support or use the existing return request facility, if available.</li><li>Select the reason for the return.</li><li>Provide photographs or supporting information where requested.</li><li>Follow the return instructions provided by the support team.</li></ol>
      </PolicySection>
      <PolicySection title="Refund Process"><p>Approved refunds will be processed through the authorised payment gateway to the original payment method. Processing time depends on the payment provider and banking institution, and customers will be informed when the refund is initiated.</p></PolicySection>
      <PolicySection title="Replacement"><p>Where appropriate and subject to availability, an eligible replacement may be arranged. If a replacement cannot be provided, an eligible refund may be processed.</p></PolicySection>
      <PolicySection title="Vendor Responsibility"><p>The vendor may be responsible for applicable return costs and replacement or refund expenses where the return arises from defective products, incorrect products, product misrepresentation or damage resulting from inadequate packaging.</p></PolicySection>
      <PolicySection title="Return to Origin (RTO)"><p>Orders that cannot be delivered may be returned to the vendor. Applicable courier charges and settlement adjustments will be handled according to the vendor agreement.</p></PolicySection>
      <PolicySection title="Contact"><PolicyContact /></PolicySection>
    </PolicyPage>
  )
}
