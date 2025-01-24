"use client"
import React, { useEffect, useState } from 'react';
// import { Icon } from '@iconify/react';
import Image from 'next/image';
// import Link from 'next/link';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Fancard from '@/app/landing/components/Fancard';
import LeftSidebar from '@/components/LeftBar';
import CelebritiesList from '../components/Celebrities';
import NavBar from '@/components/NavBar';

// import { useSearchParams } from "next/navigation";

interface Artist {
  _id: number;
  name: string;
  img: string;
  para1: string;
  para2: string;
  para3: string;
  hitSong: string;
  // platforms: {
  //   spotify?: string;
  //   soundCloud?: string;
  //   youtube?: string;
  //   instagram?: string;
  //   appleMusic?: string;
  //   beatport?: string;
  //   bandcamp?: string;
  //   twitter?: string;
  //   deezer?: string;
  //   audiomack?: string;
  //   twitch?: string;
  // };
  text: string;
}

const ArtistProfile: React.FC = () => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const { id } = useParams();  // Get the `id` from the dynamic route

  useEffect(() => {
    if (id) {
      const fetchArtist = async () => {
        try {
          const response = await axios.get(`https://artistbackend.onrender.com/api/artists/${id}`);
          console.log(response)
          setArtist(response.data.data);
        } catch (error) {
          console.error('Error fetching artist:', error);
        }
      };
      fetchArtist();
    }
  }, [id]);

  if (!id) {
    // Ensure the component doesn't try to load before the `id` is available
    return <div className="text-[#fff]">Loading...</div>;
  }

  if (!artist) {
    return <div className="text-[#fff]">Loading artist data...</div>;
  }



  return (
    <div>
      <NavBar />
      <div className="flex-1 lg:block">
        <LeftSidebar />
      </div>
      <div className='flex-[3] lg:max-w-[75%] ml-auto lg:pe-[5rem] relative'>
        <div className='absolute -left-[250px] md:left-[300px] top-[940px] w-[506.15px] h-[506.15px] bg-gradient-to-r from-[#FF4081] to-[#18FFFF] rounded-full -z-50 blur-[80px] opacity-60'>

        </div>
        <section key={artist._id} className='p-4 py-[2rem]'>
          <header className='flex justify-between items-center p-3 ps-[20px] rounded-[16px] bg-gradient-to-r from-[#FFFFFF14] via-[#FFFFFF06] to-[#FFFFFF14] border-[#ffffff32] border'>
            <div className=''>
              <p className='text-[10px] lg:text-[12.57px] text-[#FFFFFF7A] font-normal leading-[15px]'>{artist.text}</p>
              <h1 className='text-[16px] lg:text-[20.27px] text-[#FFFFFF] font-medium leading-[24px]'>{artist.name}</h1>
            </div>
            <div className=' h-full'>
              <Image src={artist.img} alt={artist.name} width={140} height={160} className='rounded-[11px] lg:w-[119px] lg:h-[119px] object-cover' />
            </div>
          </header>

          <div className='pt-[2rem]'>
            <h1 className='text-[32px] lg:text-[62px] text-[#FFFFFF] font-bold leading-[48px]'>{artist.name}</h1>
            <p className='text-[14px] lg:text-[18px] text-[#FFFFFFA3] font-normal leading-[14px] my-2'>123,345,749 monthly listeners</p>
            <div className='text-[14px] lg:text-[18px] text-[#FFFFFFA3] font-normal leading-[21px] lg:leading-[27px] my-6 flex flex-col gap-4'>
              <p>{artist.para1}</p>
              <p>{artist.para2}</p>
              <p>{artist.para3}</p>
            </div>
          </div>

          <div className='flex items-center gap-1'>
            <h3 className='text-[14px] text-[#fff] font-medium leading-[24px]'>{artist.name}&apos;s Hit-</h3>
            <p className='text-[14px] text-[#FFFFFFA3] font-normal leading-[21px]'>{artist.hitSong}</p>
          </div>

          {/* <div className='mt-2'>
            <h3 className='text-[14px] text-[#fff] font-medium leading-[24px]'>Find {artist.name}</h3>
            <ul className='grid grid-cols-3 lg:w-[60%] gap-2 my-3'>
              {artist.platforms.spotify && <li className='text-[14px] text-[#191414] hover:text-[#1DB954] font-bold leading-[21px] p-2 bg-[#1DB954] hover:bg-[#191414] transition duration-400 ease-in-out rounded-md'><Link href={artist.platforms.spotify}>Spotify</Link></li>}

              {artist.platforms.soundCloud && <li className='text-[14px] text-[#FF5500] hover:text-[#14171A] font-bold leading-[21px] p-2 bg-[#14171A] hover:bg-[#FF4F00] transition duration-400 ease-in-out rounded-md'><Link href={artist.platforms.soundCloud}>SoundCloud</Link></li>}

              {artist.platforms.youtube && <li className='text-[14px] text-[#FF0000] hover:text-[#14171A] font-bold leading-[21px] p-2 bg-[#14171A] hover:bg-[#FF4B4B] transition duration-400 ease-in-out rounded-md'><Link href={artist.platforms.youtube}>YouTube</Link></li>}

              {artist.platforms.instagram && <li className='text-[14px] text-[#E4405F] hover:text-[#14171A] font-bold leading-[21px] p-2 bg-[#14171A] hover:bg-[#F5A5B0] transition duration-400 ease-in-out rounded-md'><Link href={artist.platforms.instagram}>Instagram</Link></li>}

              {artist.platforms.appleMusic && <li className='text-[14px] text-[#FA2B5C] hover:text-[#14171A] font-bold leading-[21px] p-2 bg-[#14171A] hover:bg-[#F57B92] transition duration-400 ease-in-out rounded-md'><Link href={artist.platforms.appleMusic}>Apple Music</Link></li>}

              {artist.platforms.twitter && <li className='text-[14px] text-[#1DA1F2] hover:text-[#14171A] font-bold leading-[21px] p-2 bg-[#14171A] hover:bg-[#1A91D0] transition duration-400 ease-in-out rounded-md'><Link href={artist.platforms.twitter}>Twitter</Link></li>}

            </ul>
          </div> */}
        </section>

        <Fancard />

        <CelebritiesList />
      </div>

    </div>
  );
};

export default ArtistProfile;
