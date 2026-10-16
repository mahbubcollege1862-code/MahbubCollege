/**
 * SMS Gateway Client for Bharat Analytica
 * Handles formatting and dispatching DLT-compliant OTP messages.
 */

export function formatIndianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '').replace(/^0/, '');
  if (digits.length === 10) return `91${digits}`;
  if (digits.startsWith('91') && digits.length === 12) return digits;
  return digits;
}

export function isValidIndianMobile(phone: string): boolean {
  const formatted = formatIndianPhone(phone);
  // Must be 91 followed by 10 digits starting with 5, 6, 7, 8, or 9
  return /^91[5-9]\d{9}$/.test(formatted);
}

async function sendDltSms(
  phone: string,
  message: string,
  templateId: string
): Promise<{ success: boolean; id?: string }> {
  const formattedPhone = formatIndianPhone(phone);

  const gatewayUrl = process.env.SMS_GATEWAY_URL || 'http://13.127.107.32/sms/V1/send-sms-api.php';
  const apiKey = process.env.SMS_API_KEY;
  if (!apiKey) {
    throw new Error('SMS_API_KEY is not configured.');
  }
  const senderId = process.env.SMS_SENDER_ID || 'MC1862';
  const entityId = process.env.SMS_DLT_ENTITY_ID || '1201162562947083464';

  const url = new URL(gatewayUrl);
  url.search = new URLSearchParams({
    apikey: apiKey,
    senderid: senderId,
    templateid: templateId,
    entityid: entityId,
    number: formattedPhone,
    message,
    format: 'json',
  }).toString();

  console.log(`[SMS Gateway] Sending SMS (template ${templateId}) to ${formattedPhone}`);

  try {
    const res = await fetch(url.toString(), {
      signal: AbortSignal.timeout(30000),
    });

    const data = await res.json();
    console.log('[SMS Gateway Response]', data);

    if (data.status !== 'OK') {
      throw new Error(data.message || 'SMS send failed');
    }

    return {
      success: true,
      id: data.data?.[0]?.id as string,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[SMS Gateway Error]', errorMsg);
    throw new Error(`Failed to send SMS: ${errorMsg}`);
  }
}

// DLT template "MC1862 OTP":
// "{#number#} is your verification code for Mahbub College registration. Valid for 2 minutes. Do not share. -- Bharat Analytica"
export async function sendOtpSms(phone: string, otp: string): Promise<{ success: boolean; id?: string }> {
  return sendDltSms(
    phone,
    `${otp} is your verification code for Mahbub College registration. Valid for 2 minutes. Do not share. -- Bharat Analytica`,
    process.env.SMS_DLT_TEMPLATE_ID || '1277179127713145558'
  );
}

// DLT template "Membership Response":
// "Your bond with Mahbub College continues! Welcome to Mahbub College Students Association. Membership ID: MAHBUB-{#number#}- {#number#} — Bharat Analytica"
// The two variables are the batch year and the member number, e.g. 1999 and 0016.
export async function sendMembershipSms(
  phone: string,
  batchYear: string,
  memberNumber: string
): Promise<{ success: boolean; id?: string }> {
  return sendDltSms(
    phone,
    `Your bond with Mahbub College continues! Welcome to Mahbub College Students Association. Membership ID: MAHBUB-${batchYear}- ${memberNumber} — Bharat Analytica`,
    process.env.SMS_DLT_MEMBERSHIP_TEMPLATE_ID || '1277179189093770271'
  );
}
