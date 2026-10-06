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

export async function sendOtpSms(phone: string, otp: string): Promise<{ success: boolean; id?: string }> {
  const formattedPhone = formatIndianPhone(phone);

  // Exact DLT registered template:
  // "{otp} is your verification code for App login. Valid for 10 minutes. Do not share. -- Bharat Analytica"
  const message = `${otp} is your verification code for App login. Valid for 10 minutes. Do not share. -- Bharat Analytica`;

  const gatewayUrl = process.env.SMS_GATEWAY_URL || 'http://13.127.107.32/sms/V1/send-sms-api.php';
  const apiKey = process.env.SMS_API_KEY || 'gfJLlF6jqw06RXoW';
  const senderId = process.env.SMS_SENDER_ID || 'ELEAPP';
  const templateId = process.env.SMS_DLT_TEMPLATE_ID || '1207177346876816078';
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

  // Log in dev environment for convenient debugging
  console.log(`[SMS Gateway] Sending OTP ${otp} to ${formattedPhone}`);

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
