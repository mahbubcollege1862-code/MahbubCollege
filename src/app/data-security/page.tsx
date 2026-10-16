import React from 'react';
import type { Metadata } from 'next';
import LegalPageLayout, { LegalSection } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Data Security',
  alternates: { canonical: '/data-security' },
  description:
    'Official Data Security safeguards of MahbubCollege Students Association, Secunderabad.',
};

const sections: LegalSection[] = [
  {
    title: "1. Protection of Personal Information",
    blocks: [
      {type: "text", text: "We implement appropriate administrative, technical, and organizational safeguards to protect personal information from unauthorized access, disclosure, alteration, misuse, loss, or destruction."},
    ],
  },
  {
    title: "2. Secure Storage",
    blocks: [
      {type: "text", text: "Member information is stored on secure systems with appropriate access controls. Access to personal data is restricted to authorized office bearers, administrators, or service providers who require such access for legitimate Association purposes."},
    ],
  },
  {
    title: "3. Access Control",
    blocks: [
      {type: "text", text: "Only authorized personnel are permitted to access member records. Access rights are granted based on responsibilities and are reviewed periodically."},
    ],
  },
  {
    title: "4. Data Transmission",
    blocks: [
      {type: "text", text: "Where applicable, information transmitted through our website is protected using industry-standard encryption technologies, such as Secure Socket Layer (SSL) or Transport Layer Security (TLS), to help safeguard data during transmission."},
    ],
  },
  {
    title: "5. Password Security",
    blocks: [
      {type: "text", text: "Members are responsible for maintaining the confidentiality of their account credentials. Passwords should not be shared with others, and users should promptly notify the Association if they suspect unauthorized access to their account."},
    ],
  },
  {
    title: "6. Third-Party Service Providers",
    blocks: [
      {type: "text", text: "Where the Association uses trusted third-party providers for website hosting, cloud storage, payment processing, email communication, or other operational services, such providers are expected to maintain appropriate security measures and process personal information only for authorized purposes."},
    ],
  },
  {
    title: "7. Data Retention",
    blocks: [
      {type: "text", text: "Personal information will be retained only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, maintain historical alumni records, or resolve disputes. Information that is no longer required will be securely deleted or anonymized where appropriate."},
    ],
  },
  {
    title: "8. Security Monitoring",
    blocks: [
      {type: "text", text: "We may periodically review and update our security practices, systems, and procedures to address evolving security risks and improve the protection of member information."},
    ],
  },
  {
    title: "9. Data Breach Response",
    blocks: [
      {type: "text", text: "In the event of a suspected or confirmed data breach, the Association will take reasonable steps to investigate the incident, mitigate its impact, and, where required by applicable law, notify affected individuals and relevant authorities."},
    ],
  },
  {
    title: "10. User Responsibilities",
    blocks: [
      {type: "text", text: "Members are encouraged to:"},
      {type: "list", items: ["Keep their contact information up to date.", "Use strong and unique passwords.", "Avoid sharing login credentials.", "Report any suspected unauthorized access or security concerns immediately."]},
    ],
  },
  {
    title: "11. Limitation of Security",
    blocks: [
      {type: "text", text: "While the Association adopts reasonable security measures to protect personal information, no method of electronic transmission or internet storage is completely secure. Accordingly, the Association cannot guarantee absolute security of information transmitted or stored electronically."},
    ],
  },
  {
    title: "12. Compliance",
    blocks: [
      {type: "text", text: "The Association endeavors to handle personal information in accordance with applicable laws and regulations, including the Digital Personal Data Protection Act, 2023 (India), and will continuously strive to improve its data protection practices."},
    ],
  },
  
];

export default function DataSecurityPage() {
  return (
    <LegalPageLayout
      title="Data Security"
      subtitle="Mahbub College Students Association"
      lastUpdated="July 2026"
      sections={sections}
    />
  );
}
