'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import LogoImg from '../assets/logo.png';
import { navLinks } from './constant';
import AuthModal from './AuthModal';

const LeftSidebar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  const active = (path: string) => path === pathname;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: window.location.origin });
    localStorage.clear(); // Clear local storage
    console.log('User signed out');
  };

  const handleSignIn = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (!session) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 120000); // 2 minutes in milliseconds

      return () => clearTimeout(timer); // Clear the timer if the component unmounts or session changes
    }
  }, [session]);

  useEffect(() => {
    console.log('Session status:', status);
  }, [status]);

  const handleButtonClick = () => {
    if (status === 'authenticated') {
      handleSignOut();
    } else {
      handleSignIn();
    }
  };

  return (
    <div className='hidden lg:flex flex-col justify-between py-10 pl-14 h-screen w-[251px] xl:w-[376px] fixed left-0 top-0 z-50 bg-black'>
      <div>
        <Link href='/' className='logo flex gap-2 mb-[5rem]'>
          <div>
            <Image src={LogoImg} className='w-[200px]' alt='Logo' />
          </div>
        </Link>
        <div className='navbar flex flex-col gap-[45px]'>
          {navLinks.map(({ title, path, icon }) => (
            <Link
              key={path}
              href={path}
              className={`flex gap-7 items-center hover:text-[#18ffffa5] hover:font-bold transition-all duration-300 border-r-[3px] hover:border-[#18FFFF] ${
                active(path)
                  ? 'border-[#18FFFF] text-[#18ffffa5] font-bold'
                  : 'text-[#A5A2B8] border-transparent'
              }`}
            >
              <Icon icon={icon} className='text-[24px]' />
              <h2 className='text-lg'>{title}</h2>
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={handleButtonClick}
        className='bg-[#18FFFF] w-[80%] px-[40px] py-[10px] rounded-[14px] text-[18px] text-[#141414] font-medium mb-[3rem]'
      >
        {status === 'authenticated' ? 'Log out' : 'Sign In'}
      </button>
      <AuthModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default LeftSidebar;