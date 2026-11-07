import type { Metadata } from 'next'
import { PolicyContact, PolicyPage, PolicySection } from '@/components/policy-page'

export const metadata: Metadata = {
  title: 'Privacy Policy | Indian Heritager',
  description: 'Learn how Indian Heritager collects, uses, shares and protects marketplace information.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy" introduction={<p>Indian Heritager respects the privacy of customers, vendors and visitors using IndianHeritager.com. This policy explains the categories of information that may be collected, how it is used and the measures taken to protect it.</p>}>
      <PolicySection title="Information We Collect">
        <p><strong>Customer information:</strong> name, email address, mobile number, billing and delivery address, order and transaction information, and customer support communications.</p>
        <p><strong>Vendor information:</strong> individual or business name, business contact information, PAN and applicable KYC documents, GST and registration information, verified bank account details, product and inventory information, and applicable licences and certifications.</p>
        <p><strong>Technical information:</strong> device and browser information, IP address, website usage and interaction information, cookies and diagnostic information.</p>
        <p>Payment credentials are handled through authorised payment gateways. Indian Heritager should not collect or store full card credentials or banking passwords.</p>
      </PolicySection>
      <PolicySection title="Purpose of Data Collection"><p>Information may be used for account creation and management, vendor registration and verification, order and payment processing, delivery coordination, refunds and returns, vendor settlements, customer support, fraud prevention, legal compliance and marketplace improvement.</p></PolicySection>
      <PolicySection title="Sharing of Information"><p>Information may be shared where necessary with relevant vendors, authorised payment gateways, courier and logistics partners, technology and hosting providers, professional advisers and auditors, and government authorities where legally required. Information will be shared only for appropriate operational, contractual or legal purposes.</p></PolicySection>
      <PolicySection title="Vendor Use of Customer Data"><p>Customer information provided to vendors must be used only for legitimate order fulfilment and related support. Vendors must not independently harvest, store or use customer contact information for marketing outside IndianHeritager.com.</p></PolicySection>
      <PolicySection title="Data Security"><p>Indian Heritager will take reasonable technical and organisational measures to protect information against unauthorised access, misuse, disclosure, alteration or loss. No online system can guarantee absolute security.</p></PolicySection>
      <PolicySection title="Data Retention"><p>Information may be retained as reasonably necessary for providing marketplace services, maintaining transaction records, resolving disputes, meeting statutory obligations and enforcing contractual rights.</p></PolicySection>
      <PolicySection title="User Requests"><p>Subject to applicable law, users may request access to, correction, updating or deletion of personal information. Certain information may need to be retained where required by law or for legitimate transaction and dispute-related purposes. Requests may be submitted to <a className="text-[#702d32] underline underline-offset-4" href="mailto:support@indianheritager.org">support@indianheritager.org</a>.</p></PolicySection>
      <PolicySection title="Cookies"><p>The website may use cookies for account functionality, security, preferences, analytics and performance. Users can manage cookies through browser settings; disabling certain cookies may affect website functionality.</p></PolicySection>
      <PolicySection title="Third-Party Services"><p>The marketplace may use third-party payment, logistics, analytics, hosting and technology services. Their processing is subject to their respective privacy policies.</p></PolicySection>
      <PolicySection title="Policy Updates"><p>This Privacy Policy may be updated when our services, technology or legal requirements change. The latest version will be published on this page.</p></PolicySection>
      <PolicySection title="Contact"><PolicyContact /></PolicySection>
    </PolicyPage>
  )
}
