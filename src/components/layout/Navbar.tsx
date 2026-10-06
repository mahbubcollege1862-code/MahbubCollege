'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/#about' },
  { label: 'Former Students', href: '/#alumni' },
  { label: 'Our Pride', href: '/#heritage' },
  { label: 'News & Updates', href: '/#news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/#contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-200 ${
        scrolled
          ? 'shadow-md border-b border-gray-100 py-2'
          : 'border-b border-gray-100/80 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo Brand matching Figma */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.svg"
              alt="Mahbub College Students Association"
              width={219}
              height={45}
              unoptimized
              priority
              className="h-9 sm:h-10 w-auto object-contain group-hover:opacity-95 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-nav-item font-normal text-gray-800 hover:text-[#800000] transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-semibold text-white bg-[#800000] hover:bg-[#680000] active:scale-[0.98] transition-all shadow-sm"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#800000] hover:bg-gray-50 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-nav-item px-3 py-2 rounded-lg font-normal text-gray-800 hover:bg-red-50 hover:text-[#800000] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-gray-100">
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#800000] hover:bg-[#680000] transition-colors shadow-sm"
            >
              Join Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
