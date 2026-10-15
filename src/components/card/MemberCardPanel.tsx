'use client';

import React, { useRef, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import MembershipCard, { MembershipCardData } from './MembershipCard';
import { downloadCardPng } from './downloadCard';

/** Shows the membership card with a button to download it as a PNG. */
export default function MemberCardPanel(props: MembershipCardData) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!svgRef.current) return;
    setError('');
    setDownloading(true);
    try {
      await downloadCardPng(svgRef.current, props.membershipId);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <MembershipCard ref={svgRef} {...props} className="w-full max-w-[520px] h-auto rounded-xl shadow-2xl" />
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[#800000] hover:bg-[#660000] text-white font-medium transition-colors disabled:opacity-70 cursor-pointer"
      >
        {downloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
        {downloading ? 'Preparing…' : 'Download Membership Card'}
      </button>
      {error && <p className="text-sm text-red-300">{error}</p>}
    </div>
  );
}
