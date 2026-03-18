"use client"
import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

// Import local images from src/assets/fan-moment
import Moment1 from '@/assets/fan-moment/image.png';
import Moment2 from '@/assets/fan-moment/image copy.png';
import Moment3 from '@/assets/fan-moment/image copy 2.png';
import Moment4 from '@/assets/fan-moment/image copy 3.png';
import Moment5 from '@/assets/fan-moment/image copy 4.png';
import Moment6 from '@/assets/fan-moment/image copy 5.png';
import Moment7 from '@/assets/fan-moment/image copy 6.png';
import Moment8 from '@/assets/fan-moment/image copy 7.png';
import Moment9 from '@/assets/fan-moment/image copy 8.png';
import Moment10 from '@/assets/fan-moment/image copy 9.png';
import Moment11 from '@/assets/fan-moment/image copy 10.png';
import Moment12 from '@/assets/fan-moment/image copy 11.png';
import Moment13 from '@/assets/fan-moment/image copy 12.png';
import Moment14 from '@/assets/fan-moment/image copy 13.png';
import Moment15 from '@/assets/fan-moment/image copy 14.png';

const CelebrityFanCarousel: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Using local images provided by the user
  const moments = [
    { url: Moment1, title: "Fan Moment 1" },
    { url: Moment2, title: "Fan Moment 2" },
    { url: Moment3, title: "Fan Moment 3" },
    { url: Moment4, title: "Fan Moment 4" },
    { url: Moment5, title: "Fan Moment 5" },
    { url: Moment6, title: "Fan Moment 6" },
    { url: Moment7, title: "Fan Moment 7" },
    { url: Moment8, title: "Fan Moment 8" },
    { url: Moment9, title: "Fan Moment 9" },
    { url: Moment10, title: "Fan Moment 10" },
    { url: Moment11, title: "Fan Moment 11" },
    { url: Moment12, title: "Fan Moment 12" },
    { url: Moment13, title: "Fan Moment 13" },
    { url: Moment14, title: "Fan Moment 14" },
    { url: Moment15, title: "Fan Moment 15" },
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      scrollNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [emblaApi, scrollNext]);

  if (!mounted) {
    return (
      <div className="py-6 px-4">
        <div className="h-[200px] w-full bg-white/5 animate-pulse rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="py-6 relative group/container">
      <header className="flex justify-between items-end px-4 mb-4">
        <div>
          <h2 className="text-[#FFFFFF] font-bold text-[20px] flex items-center gap-2">
            <Icon icon="mdi:camera-iris" className="text-[#18FFFF]" />
            Celebrity & Fan Moments
          </h2>
          <p className="text-white/40 text-xs mt-0.5">Capturing the bond that fuels the stars</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#18FFFF]/10 hover:border-[#18FFFF]/30 transition-all text-white/60 hover:text-[#18FFFF]"
            aria-label="Previous slide"
          >
            <Icon icon="mdi:chevron-left" width={24} />
          </button>
          <button 
            onClick={scrollNext}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#18FFFF]/10 hover:border-[#18FFFF]/30 transition-all text-white/60 hover:text-[#18FFFF]"
            aria-label="Next slide"
          >
            <Icon icon="mdi:chevron-right" width={24} />
          </button>
        </div>
      </header>

      <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="flex gap-4 px-4">
          {moments.map((moment, index) => (
            <div
              key={index}
              className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_65%] md:flex-[0_0_45%] lg:flex-[0_0_35%] relative"
            >
              <div className="relative aspect-[16/11] md:aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 hover:border-[#18FFFF]/30 transition-all duration-500 shadow-2xl">
                <Image
                  src={moment.url}
                  alt={moment.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 65vw, (max-width: 1024px) 45vw, 35vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-[#18FFFF] animate-pulse" />
                     <span className="text-[#18FFFF] text-[10px] uppercase tracking-wider font-semibold">Verified Fan Moment</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CelebrityFanCarousel;
