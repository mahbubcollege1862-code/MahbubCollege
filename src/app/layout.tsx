import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mahbubcollege.org';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mahbub College (Mahboob College) Secunderabad | Historic Institution Estd. 1862',
    template: '%s | Mahbub College Secunderabad',
  },
  description:
    'Official portal of Mahbub College (also known as Mahboob College), Secunderabad, Hyderabad, India. Founded in 1862 by P. Somasundaram Mudaliar with patron Asaf Jah VI Mir Mahbub Ali Khan. Historical venue of Swami Vivekananda\'s 1893 speech. Connect with alumni and former students.',
  keywords: [
    'mahboob college',
    'mahbub college',
    'mahbub college secunderabad',
    'mahboob college secunderabad',
    'mahbub college hyderabad',
    'mahboob college hyderabad',
    'mahbub college india',
    'mahboob college india',
    'mahbub college high school',
    'mahboob college high school',
    'mahbub degree college',
    'mahbub junior college',
    'mahbub pg college',
    'anglo vernacular high school secunderabad',
    'anglo vernacular school',
    'somasundaram mudaliar mahbub college',
    'swami vivekananda mahbub college 1893',
    'mahbub college students association',
    'mahbub college alumni',
    'mahbub college former students',
    'rashtrapati road secunderabad schools',
    'heritage educational institutions secunderabad hyderabad',
  ],
  authors: [{ name: 'Mahbub College Students Association', url: siteUrl }],
  creator: 'Mahbub College Students Association',
  publisher: 'Mahbub College Students Association',
  category: 'education',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Mahbub College (Mahboob College) Secunderabad',
    title: 'Mahbub College (Mahboob College) Secunderabad | Historic Institution Estd. 1862',
    description:
      'Official portal of Mahbub College (Mahboob College), Secunderabad, Hyderabad, India. Founded in 1862. Reconnect, relive memories, and support our heritage.',
    images: [
      {
        url: '/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Mahbub College Historic Campus Secunderabad Hyderabad India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahbub College (Mahboob College) Secunderabad | Estd. 1862',
    description:
      'Official portal of Mahbub College, Secunderabad, Hyderabad, India. Established 1862. Reconnect with fellow former students.',
    images: ['/hero-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  other: {
    'geo.region': 'IN-TG',
    'geo.placename': 'Secunderabad, Hyderabad, Telangana, India',
    'geo.position': '17.4399;78.4983',
    'ICBM': '17.4399, 78.4983',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['EducationalOrganization', 'CollegeOrUniversity', 'HighSchool'],
      '@id': `${siteUrl}/#institution`,
      name: 'Mahbub College',
      alternateName: [
        'Mahboob College',
        'Mahbub College Secunderabad',
        'Mahboob College Secunderabad',
        'Mahbub College Hyderabad',
        'Mahboob College Hyderabad',
        'Mahbub College India',
        'Mahboob College India',
        'Mahbub College High School',
        'Mahboob College High School',
        'Anglo Vernacular High School',
        'Anglo Vernacular School Secunderabad',
        'Mahbub Junior College',
        'Mahbub Degree College',
        'Mahbub PG College',
      ],
      url: siteUrl,
      logo: `${siteUrl}/logo.svg`,
      image: `${siteUrl}/hero-bg.jpg`,
      description:
        'Mahbub College (also spelled Mahboob College) is a historic educational institution established in 1862 in Secunderabad, Hyderabad, Telangana, India. Founded by visionary philanthropist P. Somasundaram Mudaliar and supported by Asaf Jah VI Mir Mahbub Ali Khan. Famous as the historic venue where Swami Vivekananda delivered his first public lecture in Hyderabad in 1893.',
      foundingDate: '1862',
      founder: {
        '@type': 'Person',
        name: 'P. Somasundaram Mudaliar',
        jobTitle: 'Founder & Honorary Secretary',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rashtrapati Road (RP Road)',
        addressLocality: 'Secunderabad',
        addressRegion: 'Telangana',
        postalCode: '500003',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 17.4399,
        longitude: 78.4983,
      },
      sameAs: [
        'https://en.wikipedia.org/wiki/Mahbub_College_High_School',
      ],
      hasPart: [
        { '@type': 'EducationalOrganization', name: 'Anglo Vernacular High School' },
        { '@type': 'EducationalOrganization', name: 'Mahbub Junior College' },
        { '@type': 'EducationalOrganization', name: 'Mahbub Degree College' },
        { '@type': 'EducationalOrganization', name: 'Mahbub PG College' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Mahbub College (Mahboob College) Official Portal',
      description:
        'Official portal and alumni community of Mahbub College, Secunderabad, Hyderabad, India.',
      publisher: { '@id': `${siteUrl}/#institution` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#alumni-association`,
      name: 'Mahbub College Students Association',
      parentOrganization: { '@id': `${siteUrl}/#institution` },
      url: siteUrl,
      description:
        'Association uniting alumni and former students of Mahbub College across generations.',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 font-sans antialiased flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
