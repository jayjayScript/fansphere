"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import LogoImg from '../assets/logo.png'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { navLinks } from './constant'
import { usePathname, useRouter } from 'next/navigation'
import useToggle from '@/hooks/useToogle'
import AuthModal from './AuthModal'

const NavBar = () => {
  const [T, Tfunc] = useToggle(true)
  const pathname = usePathname();
    const router = useRouter(); // Added useRouter
    const [showModal, setShowModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const user = localStorage.getItem('user'); // Check if user is logged in
      setIsAuthenticated(!!user); // Set isAuthenticated based on user data
    }, []);
  
    const active = (path: string) => path === pathname;
  
    const handleSignOut = () => {
      localStorage.removeItem('user'); // Clear user data
      setIsAuthenticated(false);
      router.push('/'); // Use router for navigation
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
    <div className='md:hidden'>
      <header className='flex justify-between items-center w-full p-4'>
        <div>
          <Image src={LogoImg} className='w-[200px]' alt="alt" />
        </div>
        <div>
          <Icon icon="gg:menu-motion" className={`text-[#fff] cursor-pointer`} width="24" height="24"
            onClick={Tfunc}
          ></Icon>
        </div>
      </header>

      <div className={`bg-[#000000CC] h-screen w-full fixed top-0 z-40 p-4 backdrop-blur-md flex flex-col justify-between transition-all duration-300 ease-linear ${T ? "-right-[100%] opacity-0" : "opacity-100 right-0 "} `}>
        <header className='flex justify-end'>
          <Icon icon="lets-icons:close-ring-light" className='text-[#fff] cursor-pointer' width="35" height="35"
            onClick={Tfunc}
          ></Icon>
        </header>

        <div className=''>
          {
            navLinks.map(({ title, path }) => (
              <Link href={path} key={title} className={`text-[#fff] hover:text-[#18FFFF] transition duration-400 ease-linear ${active(path) ? 'text-[#18FFFF]' : ''}`}>
                <h2 className=' text-[32.13px] leading-[48.2px] font-normal text-center my-8'>{title}</h2>
              </Link>
            ))
          }
        </div>


        <button
          onClick={handleButtonClick}
          className='bg-[#18FFFF] w-full px-[40px] py-[10px] rounded-[14px] text-[18px] text-[#141414] font-medium mb-[3rem]'
        >
          {isAuthenticated ? (
          <span>Log out</span>
        ) : (
          <span>Sign in</span>
        )} 
        </button>
        <AuthModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </div>
  )
}

export default NavBar

