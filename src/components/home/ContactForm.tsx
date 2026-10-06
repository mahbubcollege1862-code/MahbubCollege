'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, AlertCircle, Loader2, Users, BookOpen, School } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    relativeName: '',
    dob: '',
    branch: '',
    batchYear: '',
    phone: '',
    agreed: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // OTP Verification States
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpSuccessMessage, setOtpSuccessMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);

  // 60-second cooldown timer
  React.useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const defaultBranches = [
    'Anglo Vernacular High School',
    'Mahbub Junior College',
    'Mahbub Degree College (Arts & Commerce)',
    'Mahbub Degree College (Science)',
    'Mahbub PG College (MBA / MCA)',
    'Other / Historic Institution'
  ];

  const [branches, setBranches] = useState<string[]>(defaultBranches);

  // Fetch configurable branches from Supabase table
  React.useEffect(() => {
    async function loadBranches() {
      try {
        const { data, error } = await supabase
          .from('branches')
          .select('name')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          setBranches(data.map((b: { name: string }) => b.name));
        }
      } catch {
        // Fallback to defaultBranches if any error occurs
      }
    }
    loadBranches();
  }, []);

  const startYear = 1862;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => String(currentYear - i)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSendOtp = async () => {
    setOtpError('');
    setOtpSuccessMessage('');

    const cleanDigits = formData.phone.replace(/\D/g, '');
    if (!cleanDigits || cleanDigits.length < 10) {
      setOtpError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setOtpLoading(true);
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setOtpError(data.error || 'Failed to send verification code.');
        if (data.cooldownRemaining) {
          setCooldown(data.cooldownRemaining);
        }
      } else {
        setOtpSent(true);
        setCooldown(data.cooldown || 60);
        setOtpSuccessMessage('Verification code sent to your mobile number.');
      }
    } catch {
      setOtpError('Network error. Unable to send verification code.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError('');
    if (otp.trim().length !== 6) {
      setOtpError('Please enter the 6-digit code received on your phone.');
      return;
    }

    setVerifyLoading(true);
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, otp: otp.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setOtpError(data.error || 'Invalid verification code.');
      } else {
        setIsPhoneVerified(true);
        setOtpError('');
        setOtpSuccessMessage('Mobile number verified successfully.');
      }
    } catch {
      setOtpError('Network error. Unable to verify code.');
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your mobile number.');
      return;
    }
    if (!isPhoneVerified) {
      setErrorMessage('Please verify your mobile number with the OTP code first.');
      return;
    }
    if (!formData.agreed) {
      setErrorMessage('Please accept the terms and certification to proceed.');
      return;
    }

    setLoading(true);

    try {
      // Secure submission via /api/register route
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          relativeName: formData.relativeName.trim() || null,
          dob: formData.dob || null,
          branch: formData.branch || null,
          batchYear: formData.batchYear || null,
          phone: formData.phone.trim(),
          agreed: formData.agreed,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration failed.');
      }

      setSuccess(true);
      setFormData({
        fullName: '',
        relativeName: '',
        dob: '',
        branch: '',
        batchYear: '',
        phone: '',
        agreed: false,
      });
      setIsPhoneVerified(false);
      setOtpSent(false);
      setOtp('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during registration. Please try again.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-16 lg:py-24 text-white overflow-hidden border-t border-gray-800">
      {/* Full-bleed Banner Background Image from Figma (matching hero section) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Mahbub College Historic Campus"
          fill
          quality={95}
          className="object-cover object-center filter brightness-[0.75] contrast-[1.05]"
          sizes="100vw"
        />
        {/* Dark overlay matching Figma Contact_us_background_image (0.85 black fill) */}
        <div className="absolute inset-0 bg-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/75" />
      </div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#800000]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10 font-google-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Brand Message & Badges (Matches Figma Frame 1000001798) */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-2">
            <div>
              <span className="inline-block text-xs uppercase tracking-widest text-red-300 font-semibold px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 mb-4">
                Mahbub College Students Association
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.15] tracking-tight mb-6">
                Reconnect.<br />
                Relive.<br />
                <span className="text-red-300">Support & Save.</span>
              </h2>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-10">
                Your memories, friendships and journey are part of a legacy that spans generations. Register today, stay connected with fellow students, and be part of our collective effort to support and save Mahbub College for future generations.
              </p>
            </div>

            {/* 3 Pillars / Badges (Matches Figma Frame 1000001861 & User Screenshot) */}
            <div className="grid grid-cols-3 divide-x divide-white/25 pt-8 sm:pt-10 border-t border-white/15 mt-8 sm:mt-12">
              {/* 1. Reconnect */}
              <div className="flex flex-col items-center text-center px-1.5 sm:px-3">
                <div className="w-13 h-13 sm:w-[60px] sm:h-[60px] rounded-full bg-[#800000] border border-white/20 flex items-center justify-center text-white shrink-0 shadow-md mb-3">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[1.8]" />
                </div>
                <h4 className="font-google-sans font-medium sm:font-semibold text-white text-sm sm:text-lg lg:text-[20px] leading-snug mb-1">
                  Reconnect
                </h4>
                <p className="font-google-sans text-white/80 text-xs sm:text-[13px] leading-snug max-w-[130px] sm:max-w-[160px]">
                  With batchmates and old friends
                </p>
              </div>

              {/* 2. Relive */}
              <div className="flex flex-col items-center text-center px-1.5 sm:px-3">
                <div className="w-13 h-13 sm:w-[60px] sm:h-[60px] rounded-full bg-[#800000] border border-white/20 flex items-center justify-center text-white shrink-0 shadow-md mb-3">
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[1.8]" />
                </div>
                <h4 className="font-google-sans font-medium sm:font-semibold text-white text-sm sm:text-lg lg:text-[20px] leading-snug mb-1">
                  Relive
                </h4>
                <p className="font-google-sans text-white/80 text-xs sm:text-[13px] leading-snug max-w-[130px] sm:max-w-[160px]">
                  Memories of your journey
                </p>
              </div>

              {/* 3. Support & Save */}
              <div className="flex flex-col items-center text-center px-1.5 sm:px-3">
                <div className="w-13 h-13 sm:w-[60px] sm:h-[60px] rounded-full bg-[#800000] border border-white/20 flex items-center justify-center text-white shrink-0 shadow-md mb-3">
                  <School className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[1.8]" />
                </div>
                <h4 className="font-google-sans font-medium sm:font-semibold text-white text-sm sm:text-lg lg:text-[20px] leading-snug mb-1">
                  Support &amp; Save
                </h4>
                <p className="font-google-sans text-white/80 text-xs sm:text-[13px] leading-snug max-w-[130px] sm:max-w-[170px]">
                  Mahbub College for future generations
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form (Matches Figma Form Register) */}
          <div className="lg:col-span-7 bg-black/40 backdrop-blur-md rounded-[24px] p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl">
            {success ? (
              <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
                <p className="text-gray-300 text-base max-w-md leading-relaxed mb-6">
                  Thank you for registering. You have taken a vital step in connecting with the Mahbub College Students Association and supporting our shared heritage.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 rounded-full bg-[#800000] text-white text-sm font-semibold hover:bg-red-800 transition-colors cursor-pointer shadow-md"
                >
                  Register Another Member
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 1. Full Name (Mandatory) */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    required
                    className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-hidden focus:border-[#800000] focus:ring-1 focus:ring-[#800000] text-sm transition-all shadow-xs"
                  />
                </div>

                {/* 2. Relative Name (Optional, removed father/guardian) */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">
                    Relative Name
                  </label>
                  <input
                    type="text"
                    name="relativeName"
                    value={formData.relativeName}
                    onChange={handleChange}
                    placeholder="Enter Relative Name"
                    className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-hidden focus:border-[#800000] focus:ring-1 focus:ring-[#800000] text-sm transition-all shadow-xs"
                  />
                </div>

                {/* 3. Date of Birth (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-hidden focus:border-[#800000] focus:ring-1 focus:ring-[#800000] text-sm transition-all shadow-xs"
                  />
                </div>

                {/* 4. Branch / Institution (Dropdown, Configurable from Supabase table) */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">
                    Branch / Institution
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-hidden focus:border-[#800000] focus:ring-1 focus:ring-[#800000] text-sm transition-all cursor-pointer shadow-xs"
                  >
                    <option value="" className="text-gray-500">Select Branch / Institution</option>
                    {branches.map((b) => (
                      <option key={b} value={b} className="bg-white text-gray-900">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Batch - Year of Leaving (Dropdown, Optional) */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">
                    Batch - Year of Leaving
                  </label>
                  <select
                    name="batchYear"
                    value={formData.batchYear}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-hidden focus:border-[#800000] focus:ring-1 focus:ring-[#800000] text-sm transition-all cursor-pointer shadow-xs"
                  >
                    <option value="" className="text-gray-500">Select Year</option>
                    {years.map((y) => (
                      <option key={y} value={y} className="bg-white text-gray-900">
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 6. Mobile Number (Mandatory) + Send OTP Button */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-white">
                      Mobile Number <span className="text-red-400">*</span>
                    </label>
                    {isPhoneVerified && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsPhoneVerified(false);
                          setOtpSent(false);
                          setOtp('');
                          setOtpError('');
                          setOtpSuccessMessage('');
                        }}
                        className="text-xs text-red-300 hover:text-white underline cursor-pointer"
                      >
                        Change Number
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isPhoneVerified}
                      placeholder="+91 98765 43210"
                      required
                      className={`w-full sm:flex-1 h-12 px-4 rounded-lg border text-sm transition-all shadow-xs ${
                        isPhoneVerified
                          ? 'bg-gray-100 border-emerald-500 text-gray-700 cursor-not-allowed'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-hidden focus:border-[#800000] focus:ring-1 focus:ring-[#800000]'
                      }`}
                    />

                    {!isPhoneVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpLoading || cooldown > 0 || !formData.phone.trim()}
                        className="h-12 px-5 rounded-lg bg-[#800000] hover:bg-[#680000] border border-[#bd0404] text-white font-medium text-sm transition-all flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                      >
                        {otpLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                        ) : null}
                        {cooldown > 0
                          ? `Resend in ${cooldown}s`
                          : otpSent
                          ? 'Resend OTP'
                          : 'Send OTP'}
                      </button>
                    )}
                  </div>

                  {isPhoneVerified && (
                    <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Mobile number verified</span>
                    </div>
                  )}

                  {!isPhoneVerified && otpSuccessMessage && (
                    <p className="mt-2 text-xs text-emerald-300">{otpSuccessMessage}</p>
                  )}
                </div>

                {/* Inline OTP Verification Field (Revealed once OTP is sent) */}
                {otpSent && !isPhoneVerified && (
                  <div className="p-4 rounded-xl bg-black/40 border border-white/20 space-y-2">
                    <label className="block text-sm font-medium text-white">
                      Enter 6-Digit OTP <span className="text-red-400">*</span>
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                          setOtp(val);
                          if (otpError) setOtpError('');
                        }}
                        placeholder="123456"
                        className="w-full sm:flex-1 h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 tracking-widest text-center sm:text-left text-lg font-mono focus:outline-hidden focus:border-[#800000] focus:ring-1 focus:ring-[#800000] transition-all shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={verifyLoading || otp.length !== 6}
                        className="h-12 px-6 rounded-lg bg-[#800000] hover:bg-[#680000] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all cursor-pointer flex items-center justify-center shrink-0 shadow-xs"
                      >
                        {verifyLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                        ) : null}
                        Verify OTP
                      </button>
                    </div>

                    {/* Small error message below OTP field */}
                    {otpError && (
                      <p className="text-xs text-red-400 pt-1 font-medium">{otpError}</p>
                    )}
                  </div>
                )}

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="agreed"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded-sm border-gray-300 text-[#800000] focus:ring-[#800000] cursor-pointer"
                  />
                  <label htmlFor="agreed" className="text-xs sm:text-sm text-gray-200 leading-snug cursor-pointer">
                    I certify that the above information is true and I agree to the{' '}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-300 underline hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Terms
                    </a>{' '}
                    &amp;{' '}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-300 underline hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Privacy Policy
                    </a>.
                  </label>
                </div>

                {/* Submit Button (Figma Register Button: rgb(128,0,0) pill - only enabled after successful OTP) */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading || !isPhoneVerified}
                    title={!isPhoneVerified ? 'Please verify your mobile number first' : undefined}
                    className={`w-full h-13 rounded-full text-white font-semibold text-base transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                      isPhoneVerified
                        ? 'bg-[#800000] hover:bg-[#680000] active:scale-[0.99] cursor-pointer'
                        : 'bg-white/10 border border-white/20 text-gray-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Registering...</span>
                      </>
                    ) : (
                      <span>{isPhoneVerified ? 'Register' : 'Verify Mobile to Register'}</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
