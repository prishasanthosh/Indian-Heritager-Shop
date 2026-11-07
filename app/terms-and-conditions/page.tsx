import type { Metadata } from 'next'
import { PolicyContact, PolicyPage, PolicySection } from '@/components/policy-page'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Indian Heritager',
  description: 'Read the marketplace terms governing account use, orders, payments, delivery, returns and vendor activity.',
  alternates: { canonical: '/terms-and-conditions' },
}

export default function TermsAndConditionsPage() {
  return (
    <PolicyPage title="Terms & Conditions" introduction={<p>Welcome to IndianHeritager.com, a multi-vendor e-commerce marketplace operated by Indian Heritager. By accessing, browsing, registering on or purchasing through the website, you agree to comply with these Terms & Conditions and the other policies published on the platform.</p>}>
      <PolicySection title="1. Introduction">
        <p>IndianHeritager.com aims to connect traditional artisans, handloom weavers, Self-Help Groups (SHGs), NGOs, women-led enterprises, organic producers, manufacturers, MSMEs, social enterprises and established brands with customers across India.</p>
        <p>Please read these terms carefully before using our services.</p>
      </PolicySection>
      <PolicySection title="2. About Our Marketplace">
        <p>IndianHeritager.com operates as an online marketplace that enables independent vendors to showcase and sell their products to customers. Our platform facilitates product discovery and listings, vendor registration and verification, customer order placement, payment collection through authorised gateways, order and delivery coordination, vendor settlements, customer support, return coordination and eligible promotional opportunities.</p>
        <p>Products may be supplied directly by independent registered vendors. Unless expressly stated otherwise, vendors are responsible for the authenticity, quality, description, packaging, legal compliance and fulfilment of their respective products.</p>
      </PolicySection>
      <PolicySection title="3. Eligibility to Use the Website">
        <p>Users must provide accurate and complete information when registering or placing orders and confirm that they are legally capable of entering into a binding agreement under applicable Indian law, that their information is accurate and current, that they will use the website only for lawful purposes, and that they will not misuse the platform or interfere with its operations.</p>
        <p>We reserve the right to restrict or suspend accounts involved in fraudulent, unlawful or abusive activities, subject to applicable law.</p>
      </PolicySection>
      <PolicySection title="4. User Account and Security">
        <p>Users are responsible for maintaining the confidentiality of login credentials, keeping account information accurate, reporting suspected unauthorised account access and avoiding disclosure of credentials to unauthorised persons.</p>
        <p>Indian Heritager will not be responsible for losses arising from unauthorised account use where the loss results from a user's failure to protect their credentials, subject to applicable law.</p>
      </PolicySection>
      <PolicySection title="5. Product Information and Listings">
        <p>We make reasonable efforts to ensure that product listings are accurate and current. Listings may include product name and description, photographs, selling price and MRP, materials or ingredients, dimensions, weight, manufacturer details, country of origin, availability and delivery information.</p>
        <p>Handcrafted and naturally made products may show slight variations in colour, texture, dimensions or appearance. Such variations will not automatically constitute a defect where they are consistent with the product and its description. Customers are encouraged to review all details before ordering.</p>
      </PolicySection>
      <PolicySection title="6. Product Availability">
        <p>Availability is managed by each vendor. It may change because of sales, inventory updates, production limits, fulfilment constraints or temporary listing deactivation. If a product becomes unavailable after ordering, the customer may be notified and an eligible refund processed.</p>
      </PolicySection>
      <PolicySection title="7. Pricing and Taxes">
        <p>Prices are displayed in Indian Rupees unless otherwise specified. The final order amount may include the product price, applicable taxes, delivery charges and other charges disclosed during checkout.</p>
        <p>Prices and charges may change without notice, but a change after a successful order will not ordinarily affect the confirmed order price except where correction or cancellation is legally permitted.</p>
      </PolicySection>
      <PolicySection title="8. Payment Terms">
        <p>Payments are collected through authorised payment gateways integrated with IndianHeritager.com. Customers may use the payment methods made available during checkout. An order is successfully placed after payment processing and generation of the order confirmation.</p>
        <p>Indian Heritager does not ask customers to disclose banking passwords, card PINs or OTPs through support channels. Payment processing remains subject to the terms and security procedures of the applicable payment provider.</p>
      </PolicySection>
      <PolicySection title="9. Order Confirmation and Processing">
        <p>After successful payment, the order is recorded, the vendor is notified, the vendor acknowledges and prepares the order, the product is packed and dispatched, tracking is updated where available and the order is delivered to the customer's address.</p>
        <p>Standard products are ordinarily dispatched within 2–3 business days. Made-to-Order and customised products follow their listed production and dispatch timelines.</p>
      </PolicySection>
      <PolicySection title="10. Shipping and Delivery">
        <p>Delivery timelines depend on vendor location, customer address, product availability, manufacturing requirements, courier availability and other operational circumstances.</p>
        <p>Delivery estimates may be affected by weather, public holidays, courier disruptions, remote locations and circumstances beyond reasonable control. Customers should refer to the Shipping & Delivery Policy for further information.</p>
      </PolicySection>
      <PolicySection title="11. Cancellation Policy">
        <p>Customers may request cancellation by contacting support as soon as possible. Cancellation is subject to fulfilment status and applicable law. Orders already dispatched may not be eligible for ordinary cancellation.</p>
        <p>Made-to-Order and customised products may have specific cancellation conditions once production has commenced, subject to applicable law.</p>
      </PolicySection>
      <PolicySection title="12. Returns, Refunds and Replacements">
        <p>Eligible products may be returned within 7 days from delivery for damage, defects, incorrect delivery, material difference from the approved description, missing items or incorrect quantities.</p>
        <p>Perishable, personalised, customised and certain hygiene-sensitive products may be excluded from ordinary change-of-mind returns where legally permitted. This policy does not limit statutory rights relating to defective, damaged, spurious or incorrectly described products.</p>
        <p>Approved refunds are processed through the authorised payment gateway to the original payment method. Please refer to the Returns, Refunds & Replacements Policy for details.</p>
      </PolicySection>
      <PolicySection title="13. Vendor Responsibilities">
        <p>Each vendor is responsible for genuine and authentic products, accurate product information, product quality and safety, valid registrations and applicable licences, inventory availability, secure packaging, timely dispatch, accurate tracking, cooperation with eligible returns and complaints, and compliance with applicable law and marketplace policies.</p>
        <p>Vendor-specific commercial and operational obligations are governed by the Vendor Terms & Conditions and the applicable Vendor Agreement.</p>
      </PolicySection>
      <PolicySection title="14. Intellectual Property Rights">
        <p>All website branding, logos, text, graphics, design elements, layouts and original content belonging to Indian Heritager are protected by applicable intellectual property laws. Users must obtain prior written permission before copying, reproducing, distributing, modifying or commercially exploiting such materials.</p>
        <p>Vendors are responsible for ensuring submitted photographs, descriptions, trademarks and designs do not infringe third-party rights. Products violating copyright, trademark, geographical indication or other intellectual property rights may be removed.</p>
      </PolicySection>
      <PolicySection title="15. Prohibited Activities">
        <p>Users must not submit false or misleading information, engage in fraudulent transactions, list counterfeit or prohibited products, infringe intellectual property rights, misuse customer or vendor information, attempt to access restricted areas without authorisation, interfere with website security or functionality, use the platform unlawfully or engage in activity harmful to the marketplace or other users.</p>
        <p>We reserve the right to investigate suspected violations and take appropriate action under applicable policies and law.</p>
      </PolicySection>
      <PolicySection title="16. Privacy and Data Protection">
        <p>We collect and process information necessary to provide marketplace services, including registration, order fulfilment, payments, vendor verification and customer support. Personal information is handled in accordance with our Privacy Policy and applicable data protection laws.</p>
      </PolicySection>
      <PolicySection title="17. Limitation of Liability">
        <p>Indian Heritager will take reasonable steps to maintain marketplace availability, security and proper functioning. To the extent permitted by law, it will not be responsible for indirect or consequential losses arising from circumstances beyond its reasonable control.</p>
        <p>Nothing in these terms excludes or limits liability that cannot legally be excluded under applicable Indian law or restricts statutory rights available to customers under consumer protection laws.</p>
      </PolicySection>
      <PolicySection title="18. Suspension or Termination">
        <p>We may restrict, suspend or terminate access where fraudulent activity is identified, false or misleading information is submitted, marketplace policies are repeatedly violated, unlawful activity is detected or the security or integrity of the platform is compromised. Action will be taken in accordance with applicable law and marketplace procedures.</p>
      </PolicySection>
      <PolicySection title="19. Changes to These Terms">
        <p>Indian Heritager may update these Terms & Conditions to reflect changes in operations, services, policies or applicable legal requirements. Revised terms will be published on this page with an updated effective date.</p>
        <p>Users are encouraged to review this page periodically.</p>
      </PolicySection>
      <PolicySection title="20. Governing Law and Jurisdiction">
        <p>These Terms & Conditions are governed by the laws of India. Disputes arising from use of the website will be addressed in accordance with applicable Indian law and the appropriate legal jurisdiction.</p>
      </PolicySection>
      <PolicySection title="21. Contact Information">
        <p>For questions, concerns or clarification regarding these Terms & Conditions, please contact us.</p>
        <PolicyContact registered />
      </PolicySection>
    </PolicyPage>
  )
}
