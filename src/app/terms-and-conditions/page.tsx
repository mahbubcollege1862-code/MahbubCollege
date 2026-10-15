import React from 'react';
import type { Metadata } from 'next';
import LegalPageLayout, { LegalSection } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Mahbub College Students Association',
  description:
    'Official Terms & Conditions of MahbubCollege Students Association, Secunderabad.',
};

const sections: LegalSection[] = [
  {
    title: "1. Accuracy of Information",
    blocks: [
      {type: "text", text: "I certify that all the information provided by me during registration is true, correct, and complete to the best of my knowledge. I understand that providing false or misleading information may result in rejection, suspension, or cancellation of my membership."},
    ],
  },
  {
    title: "2. Alumni Status",
    blocks: [
      {type: "text", text: "I declare that I am a present or former student of MahbubCollege or otherwise eligible for membership as per the Constitution and Bye-laws of the MahbubCollege Students Association."},
    ],
  },
  {
    title: "3. Consent to Collect and Process Personal Information",
    blocks: [
      {type: "text", text: "I voluntarily consent to the collection, storage, processing, and use of my personal information, including but not limited to my name, contact details, academic information, professional details, photographs, and other information submitted by me for the purposes of:"},
      {type: "text", text: "Maintaining the official alumni database."},
      {type: "text", text: "Membership verification."},
      {type: "text", text: "Communication regarding alumni activities."},
      {type: "text", text: "Organizing events, reunions, seminars, and networking programs."},
      {type: "text", text: "Issuing membership identification."},
      {type: "text", text: "Providing alumni-related services."},
      {type: "text", text: "Conducting surveys and research for alumni engagement."},
      {type: "text", text: "Maintaining historical alumni records."},
    ],
  },
  {
    title: "4. Communication Consent",
    blocks: [
      {type: "text", text: "I authorize the Association to communicate with me through:"},
      {type: "list", items: ["Email", "SMS", "Phone Calls", "WhatsApp", "Postal Communication", "Mobile Applications", "Social Media", "Any other official communication platform"]},
      {type: "text", text: "for matters relating to the Association."},
    ],
  },
  {
    title: "5. Alumni Directory",
    blocks: [
      {type: "text", text: "I understand that my name, batch, course, profession, city, and other non-sensitive information may be displayed in the official Alumni Directory accessible only as permitted by the Association. I may request changes to my visibility preferences subject to Association policies."},
    ],
  },
  {
    title: "6. Use of Photographs and Media",
    blocks: [
      {type: "text", text: "I authorize the Association to use photographs, videos, audio recordings, event participation records, testimonials, and similar materials featuring me during official Association activities for:"},
      {type: "list", items: ["Website", "Social Media", "Annual Reports", "Souvenirs", "Newsletters", "Promotional Materials", "Publications", "Archives"]},
      {type: "text", text: "without payment of any royalty or compensation."},
    ],
  },
  {
    title: "7. Membership Verification",
    blocks: [
      {type: "text", text: "I understand that the Association may verify my identity and alumni status using available college records or other supporting documents. I agree to provide additional documents if requested."},
    ],
  },
  {
    title: "8. Data Security",
    blocks: [
      {type: "text", text: "The Association shall take reasonable measures to protect my personal information. However, I understand that no electronic system is completely secure, and I acknowledge the inherent risks associated with digital storage and communication."},
    ],
  },
  {
    title: "9. Updates to Information",
    blocks: [
      {type: "text", text: "I agree to promptly update my personal and professional information whenever there is a significant change to ensure that the Association maintains accurate records."},
    ],
  },
  {
    title: "10. Compliance with Constitution and Bye-laws",
    blocks: [
      {type: "text", text: "I agree to abide by the Constitution, Bye-laws, Rules, Regulations, Code of Conduct, and decisions of the MahbubCollege Students Association, as amended from time to time."},
    ],
  },
  {
    title: "11. Membership Approval",
    blocks: [
      {type: "text", text: "I understand that submission of this registration form does not automatically confer membership. Membership shall become effective only upon verification and approval by the Association in accordance with its rules."},
    ],
  },
  {
    title: "12. Privacy",
    blocks: [
      {type: "text", text: "The Association shall not sell or commercially exploit my personal information. My information shall be used only for legitimate educational, alumni, administrative, charitable, historical, networking, fundraising, and Association-related purposes, except where disclosure is required by law."},
    ],
  },
  {
    title: "13. Limitation of Liability",
    blocks: [
      {type: "text", text: "The Association shall not be liable for any direct, indirect, incidental, or consequential damages arising from my use of its website, membership services, events, communications, or any third-party services linked through its platforms."},
    ],
  },
  {
    title: "14. Modification of Terms",
    blocks: [
      {type: "text", text: "The Association reserves the right to amend these Terms & Conditions, Privacy Policy, Membership Rules, and operational guidelines at any time. Updated versions shall be published on the official website and shall become effective upon publication."},
    ],
  },
  {
    title: "15. Governing Law",
    blocks: [
      {type: "text", text: "These Terms & Conditions shall be governed by the laws of India. Any disputes arising in connection with membership or these Terms shall be subject to the exclusive jurisdiction of the competent courts at Hyderabad, Telangana."},
    ],
  },
  {
    title: "16. Consent Declaration",
    blocks: [
      {type: "text", text: "By selecting the checkbox and submitting this registration form, I voluntarily:"},
      {type: "list", items: ["Confirm that I have read and understood these Terms & Conditions.", "Consent to the collection, storage, processing, and use of my information as described herein.", "Agree to receive official communications from the Association.", "Agree to abide by the Constitution and Bye-laws of the MahbubCollege Students Association.", "Confirm that the information provided by me is true and correct."]},
    ],
  },
  
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="MahbubCollege Students Association"
      lastUpdated="July 2026"
      sections={sections}
    />
  );
}
