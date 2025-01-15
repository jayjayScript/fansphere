"use client"
import React, { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import juiceImg from '../../../assets/juiceworld.png'
import novaImg from '../../../assets/nava.png'
import leoImg from '../../../assets/leo.png'
import zaraImg from '../../../assets/zara.png'
import theoImg from '../../../assets/theo.png'
import searchIcon from '@iconify/icons-mdi/magnify';
import { Icon } from '@iconify/react/dist/iconify.js';

const Topartists = () => {

  const [emblaRefArtists, emblaApiArtists] = useEmblaCarousel({
    // loop: true, // Enables infinite scrolling
    align: 'start', // Aligns slides to the start
    skipSnaps: false, // Ensures snaps work properly
    dragFree: true,
  });

  const scrollNextArtists = useCallback(() => {
    if (emblaApiArtists) emblaApiArtists.scrollNext();
  }, [emblaApiArtists]);

  useEffect(() => {
    if (!emblaApiArtists) return;

    const interval = setInterval(() => {
      scrollNextArtists();
    }, 7000); // Change the interval time as needed

    return () => clearInterval(interval);
  }, [emblaApiArtists, scrollNextArtists]);

  const topArtists = [
    {
      img: (juiceImg),
      name: "Juice WRLD",
      text: "Legends Never Die."
    },
    {
      img: (novaImg),
      name: "Nova Starling",
      text: "Pop’s Cosmic Queen"
    },
    {
      img: (leoImg),
      name: "Leo Vibes",
      text: "The Heart of Reggae Rivival"
    },
    {
      img: (zaraImg),
      name: "Zara Luxe",
      text: "Fueling the World’s Dance Floorss"
    },
    {
      img: (theoImg),
      name: "Theo sage",
      text: "Stories Told"
    },
  ]


  return (
    <div>
      <section>
        <div className='overflow-x-hidden mt-7'>.
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
          <header className='flex justify-between items-center w-full p-4'>
            <h2 className='text-[#FFFFFF] font-bold text-[20px]'>Top Artists</h2>
            {/* <button className='border-[1px] border-[#ffffff80] text-[#fff] text-[14px] font-medium rounded-[20px] px-4 py-1'>More</button> */}
          </header>

          <div ref={emblaRefArtists} className="embla__viewport mx-4">
            <div className="embla__container  flex w-full">
              {topArtists.map(({ img, name, text }, index) => (
                <div key={index} className=" artist embla__slide ">
                  <div>
                    <Image
                      src={img}
                      alt={name}
                      className="w-[155px] md:w-[195.83px] h-[155px] md:h-[195.83px] rounded-[20px]"
                    />
                  </div>
                  <div className="my-2">
                    <h2 className="text-[#fff] text-[22.14px] font-medium">{name}</h2>
                    <p className="text-[#ffffffaf] text-[14px]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Topartists