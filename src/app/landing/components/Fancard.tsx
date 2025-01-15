"use client"
import React, { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import regular from '../../../assets/regular.png'
import prime from '../../../assets/prime.png'
import premium from '../../../assets/premium.png'
import vip from '../../../assets/vip.png'
import Link from 'next/link';

const Fancard: React.FC = () => {

  const [emblaRefCards, emblaApiCards] = useEmblaCarousel({
    loop: true, // Enables infinite scrolling
    align: 'start', // Aligns slides to the start
    skipSnaps: false, // Ensures snaps work properly
    dragFree: true,
  });

  const fanCards = [
    {
      image: (regular),
    },
    {
      image: (prime),
    },
    {
      image: (premium),
    },
    {
      image: (vip),
    },
  ]

  const scrollNextCards = useCallback(() => {
    if (emblaApiCards) emblaApiCards.scrollNext();
  }, [emblaApiCards]);

  useEffect(() => {
    if (!emblaApiCards) return;

    const interval = setInterval(() => {
      scrollNextCards();
    }, 6000); // Change the interval time as needed

    return () => clearInterval(interval);
  }, [emblaApiCards, scrollNextCards]);
  return (
    <div>
      <section>
        <div className='overflow-x-hidden'>
          <header className='flex justify-between items-center w-full p-4'>
            <h2 className='text-[#FFFFFF] font-bold text-[20px]'>Fan-Card</h2>
            <button className='border-[1px] border-[#ffffff80] text-[#fff] text-[14px] font-medium rounded-[20px] px-4 py-1'>See all</button>
          </header>

          <div ref={emblaRefCards} className="embla__viewport mx-4 mb-3">
            <div className="embla__container">
              {fanCards.map(({ image }, index) => (
                <Link
                  key={index}
                  href="/purchase"
                  className="
          card embla__slide 
          w-[60%] h-[65%] 
          sm:w-[50%] sm:h-[60%] 
          md:w-[60%]
          lg:w-[70%] lg:h-[90%] 
          max-w-[629px]:w-[40%] max-w-[629px]:h-[50%] flex-shrink-0
        "
                >
                  <div className="w-full h-full">
                    <Image src={image} alt="alt" className="w-full h-full object-cover" />
                  </div>
                </Link>
              ))}
            </div>
          </div>



        </div>
      </section>
    </div>
  );
};

export default Fancard