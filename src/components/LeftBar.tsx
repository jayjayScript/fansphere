'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import LogoImg from '../assets/logo.png';
import { navLinks } from './constant';
import AuthModal from './AuthModal';

const LeftSidebar = () => {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken'); // Check if user is logged in
    setIsAuthenticated(!!userToken);
  }, []);

  const active = (path: string) => path === pathname;

  const handleSignOut = () => {
    localStorage.removeItem('userToken'); // Clear user token
    setIsAuthenticated(false);
    console.log('User signed out');
  };

  const handleSignIn = () => {
    setShowModal(true);
  };

  const handleButtonClick = () => {
    if (isAuthenticated) {
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
        {isAuthenticated ? 'Log out' : 'Sign In'}
      </button>
      
      <AuthModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default LeftSidebar;
