import React from 'react';
import type { Metadata } from 'next';
import LegalPageLayout, { LegalSection } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Account Deletion Policy',
  alternates: { canonical: '/delete-account' },
  description:
    'Official Account Deletion Policy and deletion request procedure of MahbubCollege Students Association (MCSA), Secunderabad.',
};

const sections: LegalSection[] = [
  {
    title: "1. Requesting Account Deletion",
    blocks: [
      {type: "text", text: "A registered member may request the deletion of their account at any time by:"},
      {type: "list", items: ["Logging into their account and selecting Delete Account from the Account Settings (if available).", "Sending a written request via the registered email address to the Association's official support email."]},
      {type: "text", text: "Email: mahbubcollege1862@gmail.com"},
    ],
  },
  {
    title: "2. Verification of Identity",
    blocks: [
      {type: "text", text: "To protect member privacy and prevent unauthorized deletion requests, the Association may verify the identity of the requesting member before processing the request."},
      {type: "text", text: "Verification may include:"},
      {type: "list", items: ["Registered Email Address", "Registered Mobile Number", "Membership ID", "Batch/Year of Passing", "Any additional information required for verification"]},
    ],
  },
  {
    title: "3. What Happens After Deletion",
    blocks: [
      {type: "text", text: "Upon successful verification and approval:"},
      {type: "list", items: ["Your online account will be permanently deactivated.", "Access to the member portal will be removed.", "Your login credentials will become invalid.", "Personal information stored for account management purposes will be deleted or anonymized, subject to applicable legal and operational requirements."]},
    ],
  },
  {
    title: "4. Information That May Be Retained",
    blocks: [
      {type: "text", text: "Even after account deletion, the Association may retain certain information where necessary to:"},
      {type: "list", items: ["Maintain historical alumni records.", "Preserve membership history and constitutional records.", "Comply with applicable laws or legal obligations.", "Resolve disputes or enforce Association policies.", "Maintain financial or donation records, where applicable.", "Prevent fraud or misuse of Association services."]},
      {type: "text", text: "Such retained information will not be used for marketing purposes."},
    ],
  },
  {
    title: "5. Deletion Timeline",
    blocks: [
      {type: "text", text: "The Association will make reasonable efforts to process verified account deletion requests within 60 days of receiving all required information."},
      {type: "text", text: "Where additional verification is required, processing may take longer, and the member will be informed accordingly."},
    ],
  },
  {
    title: "6. Impact of Account Deletion",
    blocks: [
      {type: "text", text: "Deleting your account may result in:"},
      {type: "list", items: ["Loss of access to the Alumni Portal.", "Removal from member-only services.", "Removal of saved preferences.", "Inability to participate in certain online Association activities using the deleted account."]},
      {type: "text", text: "Account deletion does not automatically cancel any legal, financial, or contractual obligations that may exist between the member and the Association."},
    ],
  },
  {
    title: "7. Event Records and Publications",
    blocks: [
      {type: "text", text: "Photographs, newsletters, event reports, annual reports, historical publications, or archival records created before the deletion request may continue to be retained as part of the Association's permanent historical records unless removal is legally required."},
    ],
  },
  {
    title: "8. Rejoining the Association",
    blocks: [
      {type: "text", text: "If you wish to become a member again after deleting your account, you may submit a new membership application. Approval shall be subject to the Association's Membership Rules, Constitution, and verification process."},
    ],
  },
  {
    title: "9. Contact Us",
    blocks: [
      {type: "text", text: "For any questions regarding this Privacy Policy or your personal information, please contact:"},
      {type: "text", text: "MahbubCollege Students Association (MCSA)"},
      {type: "text", text: "MahbubCollege Campus, Secunderabad, Telangana, India – 500003"},
      {type: "text", text: "Email: Support@Mahbubcollege.com"},
    ],
  },
  {
    title: "10. Delete Your Account",
    blocks: [
      {type: "text", text: "If you wish to permanently delete your MahbubCollege Students Association account, you may submit a request by emailing us from your registered email address."},
      {type: "text", text: "Please include:"},
      {type: "list", items: ["Full Name", "Membership ID (if available)", "Registered Email Address", "Registered Mobile Number", "Batch/Year of Passing", "Reason for deletion (Optional)"]},
      {type: "text", text: "After verifying your identity, we will process your request within 60 days. Certain information may be retained where required for legal compliance, financial records, or the Association's permanent alumni archives."},
      {type: "text", text: "For assistance, please contact: support@Mahbubcollege.com"},
    ],
  },
];

export default function DeleteAccountPage() {
  return (
    <LegalPageLayout
      title="Account Deletion Policy"
      subtitle="Mahbub College Students Association"
      lastUpdated="July 2026"
      sections={sections}
    />
  );
}
