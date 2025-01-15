"use client";
import React, { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-mdi/magnify';

const Landing = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const cards = [
    { head: "Choose a Fan Card...", text: "From Regular to VIP...", img: "img/image.png" },
    { head: "Fan-Cards Tailored...", text: "From Regular to VIP...", img: "img/second.png" },
    { head: "Get Closer to the Action...", text: "From Regular to VIP...", img: "img/thirdimg.png" },
  ];

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi, scrollNext]);

  return (
    <div>
      <section className='lg:max-w-[99%] m-auto'>
        <header className='w-full flex justify-end'>
          <div className="flex items-center w-full lg:w-[40%] p-4 gap-3">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="px-4 py-2 rounded-full bg-[#ffffff27] text-[16px] w-[70%] "
            />
            <div className=' w-[40px] h-[40px] rounded-full bg-[#ffffff27] '>
              <Icon icon={searchIcon} className="ml-[10px] mt-[10px] text-gray-500  text-[20px]" />
            </div>
          </div>
        </header>

        <div className="overflow-x-hidden px-4" ref={emblaRef}>
          <div className="flex items-center gap-4">
            {cards.map(({ head, text, img }, index) => (
              <div key={index} className="embla__slide flex-none w-[336px] sm:w-[400px] xl:w-[950px] h-[411px] lg:h-[522px] bg-cover bg-right p-4 py-[3rem] rounded-[20px] mx-2"
                style={{ backgroundImage: `url(${img})` }}>
                <div className=" p-4 rounded-lg xl:w-[62%]">
                  <h2 className="text-[30px] xl:text-[62px] xl:leading-[70px] text-[#fff] font-bold mb-2">{head}</h2>
                  <p className="text-[#FFFFFF] text-[14px] lg:text-[18px] font-normal w-[70%]">{text}</p>
                </div>

                <button className='bg-[#18FFFF] py-[10px] px-[40px] rounded-[14px] text-[#141414] text-[18px] font-medium mt-[3rem]'>
                  Learn more
                </button>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
};

export default Landing;