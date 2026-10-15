import React from 'react';
import type { Metadata } from 'next';
import LegalPageLayout, { LegalSection } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Mahbub College Students Association',
  description:
    'Official Privacy Policy of MahbubCollege Students Association, Secunderabad.',
};

const sections: LegalSection[] = [
  {
    title: "1. Information We Collect",
    blocks: [
      {type: "text", text: "We may collect the following information when you register or interact with us:"},
      {type: "heading", text: "Personal Information"},
      {type: "list", items: ["Full Name", "Father's/Guardian's Name", "Date of Birth", "Gender", "Batch/Year of Passing", "Course/Program Studied", "Hall Ticket/Student ID (if available)"]},
      {type: "heading", text: "Contact Information"},
      {type: "list", items: ["Mobile Number", "WhatsApp Number", "Email Address", "Postal Address", "City", "State", "Country"]},
      {type: "heading", text: "Professional Information"},
      {type: "list", items: ["Occupation", "Organization/Company", "Designation", "Business Details"]},
      {type: "heading", text: "Digital Information"},
      {type: "list", items: ["IP Address", "Browser Information", "Device Information", "Login Activity", "Cookies", "Website Usage Analytics"]},
      {type: "heading", text: "Media"},
      {type: "list", items: ["Profile Photograph", "Event Photographs", "Videos", "Audio Recordings", "Testimonials"]},
    ],
  },
  {
    title: "2. Purpose of Collecting Information",
    blocks: [
      {type: "text", text: "Your information is collected for the following purposes:"},
      {type: "list", items: ["Alumni registration and verification", "Membership management", "Maintaining alumni records", "Communication regarding Association activities", "Organizing reunions, seminars, and networking events", "Issuing membership IDs and certificates", "Publishing alumni achievements (with applicable permissions)", "Sending newsletters and announcements", "Processing donations and memberships", "Conducting surveys and research", "Improving website services", "Legal and regulatory compliance"]},
    ],
  },
  {
    title: "3. How We Use Your Information",
    blocks: [
      {type: "text", text: "Your information may be used to:"},
      {type: "list", items: ["Verify your alumni status", "Maintain the official alumni database", "Respond to your requests", "Notify you about events and meetings", "Send invitations and announcements", "Share newsletters", "Facilitate networking among alumni", "Recognize alumni achievements", "Generate statistical reports (without identifying individuals where appropriate)", "Improve member services"]},
    ],
  },
  {
    title: "4. Communication",
    blocks: [
      {type: "text", text: "By registering, you consent to receive communications through:"},
      {type: "list", items: ["Email", "SMS", "WhatsApp", "Telephone Calls", "Mobile Applications", "Social Media", "Postal Mail", "Official Website Notifications"]},
      {type: "text", text: "You may opt out of promotional communications at any time; however, important membership and administrative communications may still be sent."},
    ],
  },
  {
    title: "5. Alumni Directory",
    blocks: [
      {type: "text", text: "The Association may maintain an official Alumni Directory."},
      {type: "text", text: "The directory may include:"},
      {type: "list", items: ["Name", "Batch", "Course", "Profession", "City", "Country"]},
      {type: "text", text: "Sensitive information such as phone numbers, email addresses, and postal addresses will not be publicly displayed without your consent."},
    ],
  },
  {
    title: "6. Sharing of Information",
    blocks: [
      {type: "text", text: "The Association does not sell, rent, or trade your personal information."},
      {type: "text", text: "Information may be shared only:"},
      {type: "list", items: ["With MahbubCollege administration where necessary", "With authorized office bearers of the Association", "With service providers supporting website operations under confidentiality obligations", "When required by law, court order, or government authority", "To protect the legal rights and safety of the Association or its members"]},
    ],
  },
  {
    title: "7. Data Security",
    blocks: [
      {type: "text", text: "We implement reasonable administrative, technical, and organizational measures to safeguard your personal information from unauthorized access, disclosure, alteration, or destruction."},
      {type: "text", text: "While we strive to protect your information, no internet-based system can be guaranteed to be completely secure."},
    ],
  },
  {
    title: "8. Cookies",
    blocks: [
      {type: "text", text: "Our website may use cookies to:"},
      {type: "list", items: ["Remember user preferences", "Improve website performance", "Analyze website traffic", "Enhance user experience"]},
      {type: "text", text: "Users may disable cookies through their browser settings, although some website features may not function properly."},
    ],
  },
  {
    title: "9. Third-Party Services",
    blocks: [
      {type: "text", text: "Our website may contain links to third-party websites or services."},
      {type: "text", text: "The Association is not responsible for the privacy practices or content of external websites. Users should review the privacy policies of those websites independently."},
    ],
  },
  {
    title: "10. Photographs and Media",
    blocks: [
      {type: "text", text: "Photographs, videos, and recordings captured during Association events may be used for:"},
      {type: "list", items: ["Website", "Social Media", "Newsletters", "Annual Reports", "Souvenirs", "Promotional Materials", "Historical Archives"]},
      {type: "text", text: "If you do not wish to appear in published media, you may notify the Association in writing, and reasonable efforts will be made to honor your request where practicable."},
    ],
  },
  {
    title: "11. Data Retention",
    blocks: [
      {type: "text", text: "Your personal information will be retained only for as long as necessary to:"},
      {type: "list", items: ["Maintain alumni records", "Provide membership services", "Comply with legal obligations", "Preserve the historical records of the Association"]},
      {type: "text", text: "When information is no longer required, it will be securely deleted or anonymized where appropriate."},
    ],
  },
  {
    title: "12. Your Rights",
    blocks: [
      {type: "text", text: "Subject to applicable law, you may request to:"},
      {type: "list", items: ["Access your personal information", "Correct inaccurate information", "Update your profile", "Request deletion of information (where legally permissible)", "Withdraw consent for optional communications", "Restrict certain uses of your information"]},
      {type: "text", text: "Requests may be made by contacting the Association using the contact details below."},
    ],
  },
  {
    title: "13. Children's Privacy",
    blocks: [
      {type: "text", text: "The Association's services are intended for current students, former students, alumni, and eligible members. We do not knowingly collect personal information from children under the age of 18 without appropriate authorization where required."},
    ],
  },
  {
    title: "14. Changes to this Privacy Policy",
    blocks: [
      {type: "text", text: "The Association reserves the right to update or modify this Privacy Policy at any time."},
      {type: "text", text: "The latest version will always be available on the official website, and continued use of the website constitutes acceptance of the updated policy."},
    ],
  },
  {
    title: "15. Governing Law",
    blocks: [
      {type: "text", text: "This Privacy Policy shall be governed by and construed in accordance with the laws of India. Any disputes arising out of this Privacy Policy shall be subject to the exclusive jurisdiction of the competent courts at Hyderabad, Telangana."},
    ],
  },
  
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="MahbubCollege Students Association"
      lastUpdated="July 2026"
      sections={sections}
    />
  );
}
