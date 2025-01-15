"use client"
import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import unlimitedImg from '../../../assets/unlimited.png'
import vipCardImg from '../../../assets/vipcard.png'
import { Icon } from '@iconify/react/dist/iconify.js';

const PopularFanCard: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const popularCards = [
    {
      headText: "Unlimited Artist follow access",
      img: (unlimitedImg),
      size: "w-[188.92px] h-[262.65px]"
    },
    {
      headText: "Exclusive access to VIP-only Events",
      text: "100% unguided access covering VIP-only events, Limited-edition collectables and merch gifts.",
      img: (vipCardImg),
      size: "w-[248.71px] h-[161.5px]"
    },
    {
      headText: "Join our VIP ranks today",
      text: "Purchase a card now and get free access first hand access to all your favorite artists.",
      button: <button className='w-full bg-gradient-to-b from-[#844FFC] to-[#491EB8] py-[18px] px-4 rounded-2xl text-[#fff] text-[22px] font-[600] '>Get Started</button>
    },
  ]

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());

    const interval = setInterval(() => {
      scrollNext();
    }, 5000); // Change the interval time as needed

    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });

    return () => clearInterval(interval);
  }, [emblaApi, scrollNext]);

  return (
    <div>
      <section>
        <div ref={emblaRef} className='embla__viewport my-[3rem]'>
          <div className='embla__container flex items-center gap-3 md:gap-0 lg:justify-center '>
            {
              popularCards.map(({ headText, text, img, size, button }, index) => (
                <div key={index} className='embla__slide flex-none bg-gradient-to-b from-[#FFFFFF80] to-[#FFFFFF00] h-[487.65px] lg:h-[573.29px] w-[310px] lg:w-[375.85px] p-[30px] rounded-[30px] mx-2 md:mx-1'>
                  <div>
                    <h1 className='text-[#fff] text-[34px] font-bold leading-[41px] mb-5'>{headText}</h1>
                    <p className='text-[#EBEBF599] text-[15px] leading-[20px] mb-5'>{text}</p>
                  </div>

                  <div className=''>
                    {img && <Image src={img} className={`${size} m-auto`} alt="alt" />}
                  </div>

                  <div className='mt-[8rem]'>
                    {button}
                  </div>


                </div>
              ))
            }
          </div>
        </div>
        <div className='relative -top-[70px] flex justify-center '>
          {
            scrollSnaps.map((_, index) => (
              <button key={index}
                className={`w-2 h-2 rounded-full mx-1 ${index === selectedIndex ? 'bg-[#fff]' : 'bg-[#EBEBF54D]'}`} onClick={() => emblaApi && emblaApi.scrollTo(index)}>.
              </button>
            ))
          }
        </div>

        <div className='p-4 md:w-[50%]'>
          <h3 className='text-[#fff] text-[32px] lg:text-[62px] font-bold leading-[41px] lg:leading-[70px]'>
            Enjoy unlimited access. get your fan-card today!
          </h3>
          <button className='w-full flex justify-center items-center gap-2 lg:w-[50%] bg-gradient-to-bl from-[#18FFFF] to-[#9B51E0] p-[12px] my-9 rounded-2xl text-[#fff] text-[22px] font-[600] '> <Icon
                                icon="solar:card-bold"
                                width="21"
                                height="20"
                              ></Icon>Purchase</button>
        </div>
      </section>
    </div>
  );
};

export default PopularFanCard;