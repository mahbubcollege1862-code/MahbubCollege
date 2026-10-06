import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const quickLinks = [
    { label: 'About Us', href: '/#about' },
    { label: 'Former Students', href: '/#alumni' },
    { label: 'Our Pride', href: '/#heritage' },
    { label: 'Legacy', href: '/#legacy' },
    { label: 'Leaders', href: '/#leaders' },
    { label: 'News & Events', href: '/#news' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Contact Us', href: '/#contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms and Conditions', href: '/terms-and-conditions' },
    { label: 'Data Security', href: '/data-security' },
    { label: 'Delete Account', href: '/delete-account' },
  ];

  return (
    <footer className="relative w-full bg-[#0E2340] text-white pt-16 pb-10 overflow-hidden font-google-sans border-t border-[#1a365d]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Contact Information (Figma Container w=330) */}
          <div className="lg:col-span-6 space-y-6">
            <Link href="#home" className="inline-block">
              <div className="relative w-[240px] h-[52px]">
                <Image
                  src="/footer/Mahbub_college_logo.svg"
                  alt="Mahbub College Students Association"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <div className="space-y-3.5 text-sm text-gray-300 pt-2">
              <div className="flex items-center gap-3">
                <div className="relative w-4 h-4 shrink-0">
                  <Image src="/footer/Email.svg" alt="Email" fill className="object-contain" />
                </div>
                <a href="mailto:support@mahbubcollege.com" className="hover:text-white transition-colors">
                  support@mahbubcollege.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-4 h-4 shrink-0">
                  <Image src="/footer/Phone Number.svg" alt="Phone" fill className="object-contain" />
                </div>
                <a href="tel:+918885551660" className="hover:text-white transition-colors">
                  +91 &nbsp;888 555 1660
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-4 h-4 shrink-0">
                  <Image src="/footer/Location.svg" alt="Location" fill className="object-contain" />
                </div>
                <span>Secunderabad, Telangana, India</span>
              </div>
            </div>

            {/* Social Icons (Matches Figma: 32x32 maroon round buttons rgb(128,0,0)) */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#800000] hover:bg-red-800 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
              >
                <div className="relative w-4 h-4">
                  <Image src="/footer/Instagram.svg" alt="Instagram" fill className="object-contain" />
                </div>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#800000] hover:bg-red-800 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
              >
                <div className="relative w-4 h-4">
                  <Image src="/footer/Facebook.svg" alt="Facebook" fill className="object-contain" />
                </div>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-[#800000] hover:bg-red-800 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
              >
                <div className="relative w-4 h-4">
                  <Image src="/footer/Twitter.svg" alt="Twitter" fill className="object-contain" />
                </div>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-[#800000] hover:bg-red-800 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
              >
                <div className="relative w-4 h-4">
                  <Image src="/footer/YOutube.svg" alt="YouTube" fill className="object-contain" />
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links Column (Figma w=176) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-semibold text-base tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column (Figma w=176) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-semibold text-base tracking-wide">
              Legal & Charter
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Mahbub College Students Association. All rights reserved.</p>
          <p className="text-gray-500">Established 1862 · Secunderabad, India</p>
        </div>
      </div>
    </footer>
  );
}
