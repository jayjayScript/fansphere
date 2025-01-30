"use client"
import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import searchIcon from '@iconify/icons-mdi/magnify';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Artist {
  _id: number;
  name: string;
  img: string;
  text?: string;
  para1: string;
  para2: string;
  para3: string;
  hitSong: string;
  platforms: {
    spotify?: string;
    soundCloud?: string;
    youtube?: string;
    instagram?: string;
    appleMusic?: string;
    beatport?: string;
    bandcamp?: string;
    twitter?: string;
    deezer?: string;
    audiomack?: string;
    twitch?: string;
  };
}

const TopCelebrities = () => {
  const [Celebrities, setCelebrities] = useState<Artist[]>([])

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
        console.log('Response data:', res.data);

        // Access the `data` property
        if (res.data && Array.isArray(res.data.data)) {
          setCelebrities(res.data.data); // Set the array of Celebrities
        } else {
          setCelebrities([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error('Error fetching Celebrities:', error);
      }
    };
    fetchArtist();
  }, []);

  const [emblaRefCelebrities, emblaApiCelebrities] = useEmblaCarousel({
    loop: true, // Enables infinite scrolling
    align: 'start', // Aligns slides to the start
    skipSnaps: false, // Ensures snaps work properly
    dragFree: true,
  });

  const scrollNextCelebrities = useCallback(() => {
    if (emblaApiCelebrities) emblaApiCelebrities.scrollNext();
  }, [emblaApiCelebrities]);

  useEffect(() => {
    if (!emblaApiCelebrities) return;

    const interval = setInterval(() => {
      scrollNextCelebrities();
    }, 7000); // Change the interval time as needed

    return () => clearInterval(interval);
  }, [emblaApiCelebrities, scrollNextCelebrities]);


  return (
    <div>
      <section>
        <div className='overflow-x-hidden mt-7'>
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
            <h2 className='text-[#FFFFFF] font-bold text-[20px]'>Top Celebrities</h2>
            <button className='border-[1px] border-[#ffffff80] text-[#fff] text-[14px] font-medium rounded-[20px] px-4 py-1'>More</button>
          </header>
  
          {Array.isArray(Celebrities) && Celebrities.length > 0 ? (
            <div ref={emblaRefCelebrities} className="embla__viewport mx-4">
              <div className="embla__container flex w-full justify-between">
                {Celebrities.map((artist) => (
                  <Link href={`/celebrities/${artist._id}`} key={artist._id} className="artist embla__slide">
                    <div>
                      <Image
                        src={artist.img || '/path/to/placeholder.png'} // Fallback image
                        alt={artist.name}
                        className="w-[155px] md:w-[195.83px] h-[155px] md:h-[195.83px] rounded-[20px] object-cover"
                        width={155}
                        height={155}
                      />
                    </div>
                    <div className="my-2">
                      <h2 className="text-[#fff] text-[22.14px] lg:text-[27.98px] font-medium">{artist.name}</h2>
                      <p className="text-[#ffffffaf] text-[14px] lg:text-[23.98px]">{artist.text}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <p>No Celebrities found.</p> // Fallback UI
          )}
        </div>
      </section>
    </div>
  );
}

export default TopCelebrities