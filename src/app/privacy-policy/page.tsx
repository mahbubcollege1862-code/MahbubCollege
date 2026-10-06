import React from 'react';
import type { Metadata } from 'next';
import LegalPageLayout, { LegalSection } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Mahbub College Students Association',
  description:
    'Official Privacy Policy of MahbubCollege Students Association (MCSA), Secunderabad.',
};

const sections: LegalSection[] = [
  {
    title: '1. Information We Collect',
    content: `We may collect the following information when you register or interact with us:

Personal Information:
Full Name
Father's/Guardian's Name
Date of Birth
Gender
Batch/Year of Passing
Course/Program Studied
Hall Ticket/Student ID (if available)

Contact Information:
Mobile Number
WhatsApp Number
Email Address
Postal Address
City
State
Country

Professional Information:
Occupation
Organization/Company
Designation
Business Details

Digital Information:
IP Address
Browser Information
Device Information
Login Activity
Cookies
Website Usage Analytics

Media:
Profile Photograph
Event Photographs
Videos
Audio Recordings
Testimonials`,
  },
  {
    title: '2. Purpose of Collecting Information',
    content: `Your information is collected for the following purposes:
Alumni registration and verification
Membership management
Maintaining alumni records
Communication regarding Association activities
Organizing reunions, seminars, and networking events
Issuing membership IDs and certificates
Publishing alumni achievements (with applicable permissions)
Sending newsletters and announcements
Processing donations and memberships
Conducting surveys and research
Improving website services
Legal and regulatory compliance`,
  },
  {
    title: '3. How We Use Your Information',
    content: `Your information may be used to:
Verify your alumni status
Maintain the official alumni database
Respond to your requests
Notify you about events and meetings
Send invitations and announcements
Share newsletters
Facilitate networking among alumni
Recognize alumni achievements
Generate statistical reports (without identifying individuals where appropriate)
Improve member services`,
  },
  {
    title: '4. Communication',
    content: `By registering, you consent to receive communications through:
Email
SMS
WhatsApp
Telephone Calls
Mobile Applications
Social Media
Postal Mail
Official Website Notifications

You may opt out of promotional communications at any time; however, important membership and administrative communications may still be sent.`,
  },
  {
    title: '5. Alumni Directory',
    content: `The Association may maintain an official Alumni Directory.
The directory may include:
Name
Batch
Course
Profession
City
Country

Sensitive information such as phone numbers, email addresses, and postal addresses will not be publicly displayed without your consent.`,
  },
  {
    title: '6. Sharing of Information',
    content: `The Association does not sell, rent, or trade your personal information.
Information may be shared only:
With MahbubCollege administration where necessary
With authorized office bearers of the Association
With service providers supporting website operations under confidentiality obligations
When required by law, court order, or government authority
To protect the legal rights and safety of the Association or its members`,
  },
  {
    title: '7. Data Security',
    content: `We implement reasonable administrative, technical, and organizational measures to safeguard your personal information from unauthorized access, disclosure, alteration, or destruction.

While we strive to protect your information, no internet-based system can be guaranteed to be completely secure.`,
  },
  {
    title: '8. Cookies',
    content: `Our website may use cookies to:
Remember user preferences
Improve website performance
Analyze website traffic
Enhance user experience

Users may disable cookies through their browser settings, although some website features may not function properly.`,
  },
  {
    title: '9. Third-Party Services',
    content: `Our website may contain links to third-party websites or services.

The Association is not responsible for the privacy practices or content of external websites. Users should review the privacy policies of those websites independently.`,
  },
  {
    title: '10. Photographs and Media',
    content: `Photographs, videos, and recordings captured during Association events may be used for:
Website
Social Media
Newsletters
Annual Reports
Souvenirs
Promotional Materials
Historical Archives

If you do not wish to appear in published media, you may notify the Association in writing, and reasonable efforts will be made to honor your request where practicable.`,
  },
  {
    title: '11. Data Retention',
    content: `Your personal information will be retained only for as long as necessary to:
Maintain alumni records
Provide membership services
Comply with legal obligations
Preserve the historical records of the Association

When information is no longer required, it will be securely deleted or anonymized where appropriate.`,
  },
  {
    title: '12. Your Rights',
    content: `Subject to applicable law, you may request to:
Access your personal information
Correct inaccurate information
Update your profile
Request deletion of information (where legally permissible)
Withdraw consent for optional communications
Restrict certain uses of your information

Requests may be made by contacting the Association using the contact details below.`,
  },
  {
    title: "13. Children's Privacy",
    content: `The Association's services are intended for current students, former students, alumni, and eligible members. We do not knowingly collect personal information from children under the age of 18 without appropriate authorization where required.`,
  },
  {
    title: '14. Changes to this Privacy Policy',
    content: `The Association reserves the right to update or modify this Privacy Policy at any time.

The latest version will always be available on the official website, and continued use of the website constitutes acceptance of the updated policy.`,
  },
  {
    title: '15. Governing Law',
    content: `This Privacy Policy shall be governed by and construed in accordance with the laws of India. Any disputes arising out of this Privacy Policy shall be subject to the exclusive jurisdiction of the competent courts at Hyderabad, Telangana.`,
  },
  {
    title: '16. Contact Us',
    content: `For any questions regarding this Privacy Policy or your personal information, please contact:

MahbubCollege Students Association (MCSA)
MahbubCollege Campus, Secunderabad, Telangana, India – 500003

Email: Support@Mahbubcollege.com`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="MahbubCollege Students Association (MCSA)"
      lastUpdated="July 2026"
      sections={sections}
    />
  );
}
