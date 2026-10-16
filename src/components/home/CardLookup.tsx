'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import MemberCardPanel from '@/components/card/MemberCardPanel';
import type { MembershipCardData } from '@/components/card/MembershipCard';
import TurnstileWidget, { turnstileEnabled } from './TurnstileWidget';

interface Props {
  onBack: () => void;
}

const inputClass =
  'w-full h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-hidden focus:border-[#800000] focus:ring-1 focus:ring-[#800000] text-sm transition-all shadow-xs';

/** Lets an existing member verify their mobile number with an OTP and download their card again. */
export default function CardLookup({ onBack }: Props) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaKey, setCaptchaKey] = useState(0);
  const [member, setMember] = useState<MembershipCardData | null>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const post = async (url: string, body: unknown) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return { ok: res.ok, data: await res.json() };
  };

  const sendOtp = async () => {
    setError('');
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (turnstileEnabled && !captchaToken) {
      setError('Please complete the security check first.');
      return;
    }
    setBusy(true);
    try {
      const { ok, data } = await post('/api/otp/send', { phone, turnstileToken: captchaToken });
      if (!ok || !data.success) {
        setError(data.error || 'Failed to send verification code.');
        if (data.cooldownRemaining) setCooldown(data.cooldownRemaining);
      } else {
        setOtpSent(true);
        setCooldown(data.cooldown || 60);
      }
    } catch {
      setError('Network error. Unable to send verification code.');
    } finally {
      setBusy(false);
      setCaptchaToken('');
      setCaptchaKey((k) => k + 1);
    }
  };

  const verifyAndFetch = async () => {
    setError('');
    if (otp.trim().length !== 6) {
      setError('Please enter the 6-digit code received on your phone.');
      return;
    }
    setBusy(true);
    try {
      const verify = await post('/api/otp/verify', { phone, otp: otp.trim() });
      if (!verify.ok || !verify.data.success) {
        setError(verify.data.error || 'Invalid verification code.');
        return;
      }
      const lookup = await post('/api/membership/lookup', { phone });
      if (!lookup.ok || !lookup.data.success) {
        setError(lookup.data.error || 'Unable to find your membership.');
        return;
      }
      setMember(lookup.data.member);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (member) {
    return (
      <div className="py-4 flex flex-col items-center gap-4">
        <h3 className="text-xl font-bold text-white">Your Membership Card</h3>
        <MemberCardPanel {...member} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to registration
      </button>
      <div>
        <h3 className="text-xl font-bold text-white">Download your membership card</h3>
        <p className="text-sm text-gray-300 mt-1">
          Enter the mobile number you registered with. We&apos;ll send a verification code.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex gap-3">
        <input
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91"
          disabled={otpSent && cooldown > 0}
          className={inputClass}
        />
        <button
          type="button"
          onClick={sendOtp}
          disabled={busy || cooldown > 0}
          className="shrink-0 h-12 px-5 rounded-lg bg-[#800000] hover:bg-[#660000] text-white text-sm font-medium disabled:opacity-60 cursor-pointer"
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : otpSent ? 'Resend OTP' : 'Send OTP'}
        </button>
      </div>

      {turnstileEnabled && <TurnstileWidget onToken={setCaptchaToken} resetKey={captchaKey} />}

      {otpSent && (
        <div className="flex gap-3">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6 digit OTP"
            className={inputClass}
          />
          <button
            type="button"
            onClick={verifyAndFetch}
            disabled={busy}
            className="shrink-0 h-12 px-5 rounded-lg bg-white text-[#800000] text-sm font-semibold disabled:opacity-60 cursor-pointer inline-flex items-center gap-2"
          >
            {busy && <Loader2 className="w-4 h-4 animate-spin" />} Verify
          </button>
        </div>
      )}
    </div>
  );
}
