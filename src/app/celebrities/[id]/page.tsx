"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Fancard from '@/app/landing/components/Fancard';
import LeftSidebar from '@/components/LeftBar';
import CelebritiesList from '../components/Celebrities';
import NavBar from '@/components/NavBar';

interface Artist {
  _id: number;
  name: string;
  img: string;
  para1: string;
  para2: string;
  para3: string;
  hitSong: string;
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
    <div className="overflow-hidden lg:flex">
      <NavBar />
      <div className="flex-1 lg:block">
        <LeftSidebar />
      </div>
      <div className='lg:max-w-[75%] m-auto flex-[4] md:pt-10 relative'>
        <div className='md:absolute left-[800px] top-[80px] opacity-50'>
          <div className='absolute -left-[200px] md:-left-[500px] top-[200px] w-[406.15px] h-[406.15px] bg-gradient-to-r from-[#FF4081] to-[#18FFFF] rounded-full -z-50 blur-[70px] md:blur-[150px]'>
          </div>
          <div className='absolute -right-[120px] md:-right-[280px] top-[50px] w-[406.15px] h-[406.15px] bg-gradient-to-r from-[#8d49cd] to-[#18FFFF] rounded-full -z-50 blur-[70px] md:blur-[150px]'>
          </div>
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
        </section>
        <Fancard />
        <CelebritiesList />
      </div>
    </div>
  );
};

export default ArtistProfile;
