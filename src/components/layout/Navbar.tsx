'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/#home', id: 'home' },
  { label: 'About Us', href: '/#about', id: 'about' },
  { label: 'Former Students', href: '/#alumni', id: 'alumni' },
  { label: 'Our Pride', href: '/#heritage', id: 'heritage' },
  { label: 'News & Updates', href: '/#news', id: 'news' },
  { label: 'Gallery', href: '/gallery', id: 'gallery' },
  { label: 'Contact Us', href: '/#contact', id: 'contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // If not on homepage, highlight by route
    if (pathname && pathname !== '/') {
      if (pathname.startsWith('/gallery')) {
        setActiveSection('gallery');
      } else {
        setActiveSection('');
      }
      return;
    }

    // On home page: scroll spy tracking sections
    const sectionIds = ['home', 'about', 'alumni', 'heritage', 'news', 'contact'];

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Bottom of page activates contact
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120
      ) {
        setActiveSection('contact');
        return;
      }

      // Check section offsets
      const scrollPosition = window.scrollY + 160;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('home');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-200 ${
        scrolled
          ? 'shadow-md border-b border-gray-200 py-2'
          : 'border-b border-gray-100/90 py-2.5 sm:py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo Brand */}
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

          {/* Desktop Navigation Links with Clear Active State */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    if (item.id !== 'gallery') {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`relative px-3 py-1.5 rounded-full text-sm font-google-sans transition-all duration-200 flex items-center ${
                    isActive
                      ? 'text-[#800000] font-bold bg-red-50/90 ring-1 ring-[#800000]/25 shadow-2xs'
                      : 'text-gray-700 font-medium hover:text-[#800000] hover:bg-gray-50/80'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-[9px] left-3 right-3 h-[2.5px] bg-[#800000] rounded-full animate-in fade-in zoom-in-75 duration-150" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/#contact"
              onClick={() => setActiveSection('contact')}
              className={`inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                activeSection === 'contact'
                  ? 'bg-[#680000] text-white ring-2 ring-[#800000] ring-offset-2'
                  : 'bg-[#800000] hover:bg-[#680000] text-white active:scale-[0.98]'
              }`}
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

      {/* Mobile Menu Dropdown with Clear Active State */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1.5 font-google-sans">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3.5 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-[#800000] text-white font-semibold shadow-sm'
                      : 'text-gray-700 font-medium hover:bg-red-50/60 hover:text-[#800000]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
          <div className="pt-2 border-t border-gray-100">
            <Link
              href="/#contact"
              onClick={() => {
                setActiveSection('contact');
                setMobileMenuOpen(false);
              }}
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
