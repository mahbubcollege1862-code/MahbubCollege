import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HistoricalFigure {
  name: string;
  role: string;
  era: string;
  image: string;
  alt: string;
}

const HISTORICAL_FIGURES: HistoricalFigure[] = [
  {
    name: 'P. Somasundaram Mudaliar',
    role: 'Founder & Honorary Secretary',
    era: '(1862 - 78)',
    image: 'https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/somasundaram_mudaliar.png',
    alt: 'P. Somasundaram Mudaliar - Founder & Honorary Secretary',
  },
  {
    name: 'H.E.H. Mir Mahbub Ali Khan',
    role: 'Asaf Jah VI, Nizam of Hyderabad',
    era: '(1869 - 1911)',
    image: 'https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/mir_mahbub_ali_khan.png',
    alt: 'H.E.H. Mir Mahbub Ali Khan - Asaf Jah VI, Nizam of Hyderabad',
  },
];

export default function AboutUs() {
  return (
    <section id="about" className="relative w-full bg-[#F0F0F0] py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Historical Portraits (Matches Figma About_us Frame) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-[530px] w-full">
              {HISTORICAL_FIGURES.map((figure) => (
                <div key={figure.name} className="flex flex-col">
                  {/* Portrait Container: 241x290 with rounded-[10px] */}
                  <div className="relative w-full aspect-[241/290] rounded-[10px] overflow-hidden bg-gray-200 shadow-sm border border-black/5">
                    <Image
                      src={figure.image}
                      alt={figure.alt}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 250px, 241px"
                      className="object-cover object-top filter contrast-[1.02]"
                    />
                  </div>

                  {/* Figure Meta */}
                  <div className="mt-3.5 flex flex-col font-google-sans">
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg lg:text-[20px] leading-snug">
                      {figure.name}
                    </h3>
                    <p className="text-gray-600 font-normal text-xs sm:text-[14px] leading-tight mt-1">
                      {figure.role}
                      <br />
                      <span className="text-gray-500">{figure.era}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Narrative Copy & Read More Action (Matches Figma Frame 1000001798) */}
          <div className="lg:col-span-6 flex flex-col items-start font-google-sans">
            <h2 className="text-gray-900 font-semibold text-2xl sm:text-3xl lg:text-[40px] leading-tight tracking-tight mb-5 lg:mb-6">
              A Legacy of Excellence
            </h2>

            <div className="text-gray-700 text-sm sm:text-base lg:text-[18px] leading-relaxed font-normal space-y-4 max-w-[640px] mb-8">
              <p>
                Mahbub College (also historically known as Mahboob College) was founded in 1862 as the
                Anglo Vernacular School by visionary philanthropist P. Somasundaram Mudaliar in
                Secunderabad, Hyderabad, India. With generous support from the Sixth Nizam of
                Hyderabad, Mir Mahbub Ali Khan, the institution was renamed as Mahbub College to honor
                his contribution. This college has not only stood the test of time but has been a
                torchbearer of inclusive education for more than 160 years.
              </p>
              <p>
                On 13 February 1893, Swami Vivekananda delivered one of his earliest Indian public
                addresses here before leaving for the World Parliament of Religions in Chicago. That
                moment etched the college into national consciousness.
              </p>
            </div>

            {/* Read More Button (Matches Figma Frame 7: 132x49, r:30, border: #800000) */}
            <a
              href="https://en.wikipedia.org/wiki/Mahbub_College_High_School"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-google-sans font-semibold text-[#800000] border-2 border-[#800000] hover:bg-[#800000] hover:text-white transition-all duration-200 px-7 py-2.5 rounded-full text-sm sm:text-[18px] shadow-sm hover:shadow-md cursor-pointer"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
