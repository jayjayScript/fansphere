"use client";
import React, { useEffect, useState } from 'react';
// import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link'
import axios from 'axios';


interface Artist {
  _id: number;
  name: string;
  img: string;
  text?: string;
  para1: string;
  para2: string;
  para3: string;
  hitSong: string;
}

const LatestArtist: React.FC = () => {
  const [Celebrities, setCelebrities] = useState<Artist[]>([]);
  const MAX_LENGTH = 10;

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


  return (
    <section>
      <div className="overflow-x-hidden">
        <header className="flex justify-between items-center w-full p-4">
          <h2 className="text-[#FFFFFF] font-bold text-[20px]">Latest Celebrities</h2>
          <button className="border-[1px] border-[#ffffff80] text-[#fff] text-[14px] font-medium rounded-[20px] px-4 py-1">
            More
          </button>
        </header>

        {/* Marquee */}
        <div>
          <div className="mx-4 mb-[3rem]">
            <div className={`grid grid-cols-4 md:justify-center md:grid-cols-7 space-x-1 space-y-3`}>
              {Celebrities.slice(0, 8).map(artist => (
                <Link href={`/celebrities/${artist._id}`} key={artist._id}
                  className="flex-shrink-0"
                >
                  <div>
                    <Image
                      src={artist.img}
                      alt={artist.name}
                      className="w-[70.64px] md:w-[117.83px] h-[70.64px] md:h-[117.83px] rounded-[20px] object-cover"
                      width={70.64} height={70.64}
                    />
                  </div>
                  <div className="my-2 ">
                    <h2 className="text-[#fff] text-[12px] md:text-[16.74px] font-medium">{artist.name}</h2>
                    <p className="text-[#ffffffaf] text-[10.61px] md:text-[14.35px] w-[85%]">{
                      (artist.text ?? '').length > MAX_LENGTH ? `${(artist.text ?? '').substring(0, MAX_LENGTH)}` + "..." : artist.text
                    }</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestArtist;
