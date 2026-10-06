import Hero from '@/components/home/Hero';
import StaticBanner from '@/components/home/StaticBanner';
import AboutUs from '@/components/home/AboutUs';
import FormerStudents from '@/components/home/FormerStudents';
import Heritage from '@/components/home/Heritage';
import LegacyBuilders from '@/components/home/LegacyBuilders';
import Leaders from '@/components/home/Leaders';
import NewsUpdates from '@/components/home/NewsUpdates';
import GallerySection from '@/components/home/GallerySection';
import ContactForm from '@/components/home/ContactForm';

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Hero Section (Figma: 1:879) */}
      <Hero />

      {/* 2. Static Banner (Figma: 1:110) */}
      <StaticBanner />

      {/* 3. About Us / A Legacy of Excellence (Figma: 1:136) */}
      <AboutUs />

      {/* 4. Former Students Who Made Us Proud (Figma: 1:154) */}
      <FormerStudents />

      {/* 5. Our Heritage, Our Pride (Figma: 1:231) */}
      <Heritage />

      {/* 6. The People Who Built Our Legacy (Figma: 1:275) */}
      <LegacyBuilders />

      {/* 7. The Leaders Who Shaped Our Institution & The People Who Guided Our Institution (Figma: 1:343 & 40:1769) */}
      <Leaders />

      {/* 8. News and Updates (Figma: 4:344) */}
      <NewsUpdates />

      {/* 9. Gallery (Figma: 1:489) */}
      <GallerySection />

      {/* 10. Contact / Alumni Registration Form (Figma: 1:525) */}
      <ContactForm />
    </div>
  );
}
