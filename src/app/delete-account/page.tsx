import React from 'react';
import type { Metadata } from 'next';
import LegalPageLayout, { LegalSection } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Account Deletion Policy | Mahbub College Students Association',
  description:
    'Official Account Deletion Policy and deletion request procedure of MahbubCollege Students Association (MCSA), Secunderabad.',
};

const sections: LegalSection[] = [
  {
    title: '1. Requesting Account Deletion',
    content: `A registered member may request the deletion of their account at any time by:
Logging into their account and selecting **Delete Account** from the Account Settings (if available).
Sending a written request via the registered email address to the Association's official support email.
Email: support@mahbubcollege.com`,
  },
  {
    title: '2. Verification of Identity',
    content: `To protect member privacy and prevent unauthorized deletion requests, the Association may verify the identity of the requesting member before processing the request.

Verification may include:
Registered Email Address
Registered Mobile Number
Membership ID
Batch/Year of Passing
Any additional information required for verification`,
  },
  {
    title: '3. What Happens After Deletion',
    content: `Upon successful verification and approval:
Your online account will be permanently deactivated.
Access to the member portal will be removed.
Your login credentials will become invalid.
Personal information stored for account management purposes will be deleted or anonymized, subject to applicable legal and operational requirements.`,
  },
  {
    title: '4. Information That May Be Retained',
    content: `Even after account deletion, the Association may retain certain information where necessary to:
Maintain historical alumni records.
Preserve membership history and constitutional records.
Comply with applicable laws or legal obligations.
Resolve disputes or enforce Association policies.
Maintain financial or donation records, where applicable.
Prevent fraud or misuse of Association services.

Such retained information will not be used for marketing purposes.`,
  },
  {
    title: '5. Deletion Timeline',
    content: `The Association will make reasonable efforts to process verified account deletion requests within 30 days of receiving all required information.

Where additional verification is required, processing may take longer, and the member will be informed accordingly.`,
  },
  {
    title: '6. Impact of Account Deletion',
    content: `Deleting your account may result in:
Loss of access to the Alumni Portal.
Removal from member-only services.
Removal of saved preferences.
Inability to participate in certain online Association activities using the deleted account.
Account deletion does not automatically cancel any legal, financial, or contractual obligations that may exist between the member and the Association.`,
  },
  {
    title: '7. Event Records and Publications',
    content: `Photographs, newsletters, event reports, annual reports, historical publications, or archival records created before the deletion request may continue to be retained as part of the Association's permanent historical records unless removal is legally required.`,
  },
  {
    title: '8. Rejoining the Association',
    content: `If you wish to become a member again after deleting your account, you may submit a new membership application. Approval shall be subject to the Association's Membership Rules, Constitution, and verification process.`,
  },
  {
    title: '9. Contact Us',
    content: `For any questions regarding this Privacy Policy or your personal information, please contact:

MahbubCollege Students Association (MCSA)
MahbubCollege Campus, Secunderabad, Telangana, India – 500003

Email: Support@Mahbubcollege.com`,
  },
  {
    title: '10. Delete Your Account',
    content: `If you wish to permanently delete your MahbubCollege Students Association account, you may submit a request by emailing us from your registered email address.

Please include:
Full Name
Membership ID (if available)
Registered Email Address
Registered Mobile Number
Batch/Year of Passing
Reason for deletion (Optional)

After verifying your identity, we will process your request within 30 days. Certain information may be retained where required for legal compliance, financial records, or the Association's permanent alumni archives.

For assistance, please contact: support@Mahbubcollege.com`,
  },
];

export default function DeleteAccountPage() {
  return (
    <LegalPageLayout
      title="Account Deletion Policy"
      subtitle="MahbubCollege Students Association (MCSA)"
      lastUpdated="July 2026"
      sections={sections}
    />
  );
}
