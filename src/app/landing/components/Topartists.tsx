"use client"
import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
// import juiceImg from '../../../assets/juiceworld.png'
// import novaImg from '../../../assets/nava.png'
// import leoImg from '../../../assets/leo.png'
// import zaraImg from '../../../assets/zara.png'
// import theoImg from '../../../assets/theo.png'

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

const Topartists = () => {
  const [artists, setArtists] = useState<Artist[]>([])

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/artists')
        setArtists(res.data)
      } catch(error) {
        console.error('Error fetching artists:', error)
      }
    }
    fetchArtist()
  })

   const [emblaRefArtists, emblaApiArtists] = useEmblaCarousel({
      loop: true, // Enables infinite scrolling
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

  // const topArtists = [
  //   {
  //     img: (juiceImg),
  //     name: "Juice WRLD",
  //     text: "Legends Never Die."
  //   },
  //   {
  //     img: (novaImg),
  //     name: "Nova Starling",
  //     text: "Pop’s Cosmic Queen"
  //   },
  //   {
  //     img: (leoImg),
  //     name: "Leo Vibes",
  //     text: "The Heart of Reggae Rivival"
  //   },
  //   {
  //     img: (zaraImg),
  //     name: "Zara Luxe",
  //     text: "Fueling the World’s Dance Floorss"
  //   },
  //   {
  //     img: (theoImg),
  //     name: "Theo sage",
  //     text: "Stories Told"
  //   },
  // ]


  return (
    <div>
      <section>
        <div className='overflow-x-hidden mt-7'>
          <header className='flex justify-between items-center w-full p-4'>
            <h2 className='text-[#FFFFFF] font-bold text-[20px]'>Top Artists</h2>
            <button className='border-[1px] border-[#ffffff80] text-[#fff] text-[14px] font-medium rounded-[20px] px-4 py-1'>More</button>
          </header>

          <div ref={emblaRefArtists} className="embla__viewport mx-4">
            <div className="embla__container flex w-full justify-between">
              {artists.slice(0, 5).map((artist) => (
                <Link href={`/artists/${artist._id}`} key={artist._id} className=" artist embla__slide ">
                  <div>
                    <Image
                      src={artist.img}
                      alt={artist.name}
                      className="w-[155px] md:w-[195.83px] h-[155px] md:h-[195.83px] rounded-[20px]"
                      width={155} height={155}
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

        </div>
      </section>
    </div>
  )
}

export default Topartists