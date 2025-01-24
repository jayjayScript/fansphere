"use client"
import React from 'react'
import Image from 'next/image'
import LogoImg from '../assets/logo.png'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { navLinks } from './constant'
import { usePathname } from 'next/navigation'
import useToggle from '@/hooks/useToogle'
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const [T, Tfunc] = useToggle(true)
  const { data: session } = useSession();

  const pathname = usePathname()
  const active = (path: string) => path === pathname

  const handleSignOut = () => {
    signOut({
      callbackUrl: window.location.origin, // Redirect after sign-out
    });
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


        {
          session ? (
          <button onClick={handleSignOut} className='bg-[#18FFFF] w-full px-[40px] py-[10px] rounded-[14px] text-[18px] text-[#141414] font-medium mb-[3rem]'>
            Log out
          </button>) : (<button onClick={handleSignOut} className='bg-[#18FFFF] w-full px-[40px] py-[10px] rounded-[14px] text-[18px] text-[#141414] font-medium mb-[3rem]'>
            Log out </button>)
        }
      </div>
    </div>
  )
}

export default NavBar