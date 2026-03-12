 "use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Icon } from '@iconify/react';

interface Artist {
  _id: number;
  name: string;
  img: string;
  text?: string;
  para1: string;
  para2: string;
  para3: string;
  hitSong: string;
  fanClubCount?: number;
}

const CelebritiesList: React.FC = () => {
  const [celebrities, setCelebrities] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
        if (res.data && Array.isArray(res.data.data)) {
          setCelebrities(res.data.data);
        } else {
          setCelebrities([]);
        }
      } catch (error) {
        console.error('Error fetching Celebrities:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtist();
  }, []);

  return (
    <div>
      <section className='relative'>
        <header className='flex justify-between items-center w-full p-4 pt-6'>
          <div>
            <h2 className='text-[#FFFFFF] font-bold text-[20px]'>Celebrities</h2>
            <p className="text-white/40 text-xs mt-0.5">{celebrities.length} artists</p>
          </div>
          <div className="flex items-center gap-1 text-white/40 text-xs">
            <Icon icon="mdi:account-group" width={14} />
            Fan Club Community
          </div>
        </header>

        <div className="mx-4 mb-[3rem]">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Icon icon="mdi:loading" className="animate-spin text-[#18FFFF]" width={36} />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {celebrities.map(artist => (
                <Link
                  href={`/celebrities/${artist._id}`}
                  key={artist._id}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#18FFFF]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(24,255,255,0.1)]">
                    {/* Image container */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={artist.img}
                        alt={artist.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Fan count badge */}
                     
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm border border-[#18FFFF]/30 rounded-full px-2 py-0.5">
                          <Icon icon="mdi:account-group" width={10} className="text-[#18FFFF]" />
                          <span className="text-[#18FFFF] text-[9px] font-bold">
                            2M+
                          </span>
                        </div>
                   
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <h2 className="text-white text-[13px] font-semibold truncate group-hover:text-[#18FFFF] transition-colors duration-300">
                        {artist.name}
                      </h2>
                      {artist.text && (
                        <p className="text-white/40 text-[10px] mt-0.5 truncate">
                          {artist.text}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CelebritiesList;