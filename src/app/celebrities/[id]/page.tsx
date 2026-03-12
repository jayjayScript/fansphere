"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Fancard from '@/app/landing/components/Fancard';
import LeftSidebar from '@/components/LeftBar';
import CelebritiesList from '../components/Celebrities';
import NavBar from '@/components/NavBar';
import { Icon } from '@iconify/react';
import FanClubModal from '@/components/FanClubModal';

interface Artist {
  _id: string;
  name: string;
  img: string;
  para1: string;
  para2: string;
  para3: string;
  hitSong: string;
  text: string;
  charity: string;
  aboutCharity: string;
  fanClubCount?: number;
}

const ArtistProfile: React.FC = () => {
  const [artist, setArtist] = useState<Artist | null>(null);
  // const [fanClubCount, setFanClubCount] = useState<number>(0);
  // const [fanClubLoading, setFanClubLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchArtist = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${id}`);
          setArtist(response.data.data);
        } catch (error) {
          console.error('Error fetching artist:', error);
        }
      };
      fetchArtist();
    }
  }, [id]);

  // useEffect(() => {
  //   if (id) {
  //     const fetchFanClubCount = async () => {
  //       setFanClubLoading(true);
  //       try {
  //         const res = await axios.get(
  //           `${process.env.NEXT_PUBLIC_BACKEND_URL_V2}/fan-club/${id}`
  //         );
  //         setFanClubCount(res.data.fanClubCount || 0);
  //       } catch (err) {
  //         console.error('Error fetching fan club count:', err);
  //       } finally {
  //         setFanClubLoading(false);
  //       }
  //     };
  //     fetchFanClubCount();
  //   }
  // }, [id]);

  const openSupport = () => {
    if (typeof window !== "undefined") {
      const smartsupp = (window as { smartsupp?: ((command: string) => void) | { chat?: { open?: () => void } } }).smartsupp;
      if (typeof smartsupp === 'function') {
        smartsupp("chat:open");
      } else if (smartsupp?.chat?.open) {
        smartsupp.chat.open();
      }
    }
  };

  const handleOpenSupport = () => {
    openSupport();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Refresh fan club count after joining
    // if (id) {
    //   axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL_V2}/fan-club/${id}`)
    //     .then(res => setFanClubCount(res.data.fanClubCount || 0))
    //     .catch(console.error);
    // }
  };

  if (!id) {
    return (
      <div className="text-[#fff] flex items-center justify-center min-h-screen">
        <Icon icon="mdi:loading" className="animate-spin text-[#18FFFF]" width={40} />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="text-[#fff] flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <Icon icon="mdi:loading" className="animate-spin text-[#18FFFF]" width={40} />
          <p className="text-white/50 text-sm">Loading artist profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden lg:flex">
      <NavBar />
      <div className="flex-1 lg:block">
        <LeftSidebar />
      </div>
      <div className='lg:max-w-[75%] m-auto flex-[4] md:pt-10 relative'>
        {/* Background gradients */}
        <div className='md:absolute left-[800px] top-[80px] opacity-50'>
          <div className='absolute -left-[200px] md:-left-[500px] top-[200px] w-[406.15px] h-[406.15px] bg-gradient-to-r from-[#FF4081] to-[#18FFFF] rounded-full -z-50 blur-[70px] md:blur-[150px]' />
          <div className='absolute -right-[120px] md:-right-[280px] top-[50px] w-[406.15px] h-[406.15px] bg-gradient-to-r from-[#8d49cd] to-[#18FFFF] rounded-full -z-50 blur-[70px] md:blur-[150px]' />
        </div>

        <section key={artist._id} className='p-4 py-[2rem] relative md:max-w-[70%] m-auto'>
          {/* Artist header card */}
          <header className='flex justify-between items-center p-3 ps-[20px] rounded-[16px] bg-gradient-to-r from-[#FFFFFF14] via-[#FFFFFF06] to-[#FFFFFF14] border-[#ffffff32] border backdrop-blur-sm'>
            <div>
              <p className='text-[10px] lg:text-[12.57px] text-[#FFFFFF7A] font-normal leading-[15px]'>{artist.text}</p>
              <h1 className='text-[16px] lg:text-[20.27px] text-[#FFFFFF] font-medium leading-[24px]'>{artist.name}</h1>

              {/* Fan Club Count Badge */}
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex items-center gap-1 bg-[#18FFFF]/10 border border-[#18FFFF]/30 rounded-full px-2.5 py-0.5">
                  <Icon icon="mdi:account-group" width={13} className="text-[#18FFFF]" />
                  
                    <span className="text-[#18FFFF] text-[10px] font-semibold">
                      2M+
                    </span>
                  
                </div>
              </div>
            </div>
            <div className='h-full'>
              <Image src={artist.img} alt={artist.name} width={140} height={160} className='rounded-[11px] lg:w-[119px] lg:h-[119px] object-cover' />
            </div>
          </header>

          <div className='pt-[2rem]'>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h1 className='text-[32px] lg:text-[62px] text-[#FFFFFF] font-bold leading-[48px]'>{artist.name}</h1>
              
              {/* Fan Club Join Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className='group flex items-center gap-2 bg-gradient-to-r from-[#18FFFF] to-[#00e5f0] text-[#141414] font-bold py-3 px-6 rounded-2xl hover:shadow-[0_0_20px_rgba(24,255,255,0.4)] transition-all duration-300 hover:scale-105 text-sm flex-shrink-0 self-start mt-2'
              >
                <Icon icon="mdi:account-plus" width={18} className="group-hover:rotate-12 transition-transform duration-300" />
                Join Fan Club
              </button>
            </div>

            <div className='text-[14px] lg:text-[18px] text-[#FFFFFFA3] font-normal leading-[21px] lg:leading-[27px] mt-6 flex flex-col gap-4'>
              <p>{artist.para1}</p>
              <p>{artist.para2}</p>
              <p>{artist.para3}</p>
            </div>
          </div>

          <div className='flex items-center gap-1 mt-4'>
            <h3 className='text-[14px] text-[#fff] font-medium leading-[24px]'>{artist.name}&apos;s Hit -</h3>
            <p className='text-[14px] text-[#18FFFF] font-medium leading-[21px]'>{artist.hitSong}</p>
          </div>

          {/* Fan Club Stats Card */}
          <div className='my-5 border border-[#18FFFF]/20 rounded-2xl p-5 bg-gradient-to-br from-[#18FFFF]/5 to-transparent backdrop-blur-sm'>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#18FFFF]/10 border border-[#18FFFF]/20 flex items-center justify-center">
                <Icon icon="mdi:account-group" width={20} className="text-[#18FFFF]" />
              </div>
              <div>
                <h3 className='text-[16px] text-[#fff] font-semibold'>{artist.name}&apos;s Fan Club</h3>
                <p className="text-[#18FFFF] text-sm font-bold">
                  2M+ members
                </p>
              </div>
            </div>
            <p className='text-[13px] text-[#FFFFFFA3]'>
              Be part of the inner circle. Join {artist.name}&apos;s fan club and get exclusive access, updates, and the chance to connect directly.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className='mt-3 flex items-center gap-2 border border-[#18FFFF]/50 text-[#18FFFF] text-[13px] font-medium py-2 px-4 rounded-xl hover:bg-[#18FFFF]/10 transition-colors'
            >
              <Icon icon="mdi:plus-circle-outline" width={16} />
              Become a member
            </button>
          </div>

          <div className='my-4 border-[.5px] border-[#ffffff32] rounded-lg p-4'>
            <h3 className='text-[18px] text-center text-[#fff] font-medium leading-[24px]'>{artist.name}&apos;s Ongoing Support for {artist.charity}</h3>
            <p className='text-[13.5px] text-center text-[#FFFFFFA3] font-normal leading-[21px]'>{artist.aboutCharity}</p>
          </div>

          <div>
            <small className="text-[#fff]">
              Join {artist.name} in making a difference—donate today to support {artist.charity} and help make lives better
            </small>
            <button onClick={handleOpenSupport} className='flex items-center justify-center gap-1 bg-[#18FFFF] py-[7px] px-[20px] rounded-[14px] text-[#141414] text-[16px] font-semibold mt-2 w-[60%] md:w-[40%]'>
              Donate <Icon icon="bxs:donate-heart" className='text-[#FF4081]' width="24" height="24" />
            </button>
          </div>
        </section>

        <Fancard />
        <CelebritiesList />
      </div>

      {/* Fan Club Modal */}
      <FanClubModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        artistId={String(id)}
        artistName={artist.name}
      />
    </div>
  );
};

export default ArtistProfile;
