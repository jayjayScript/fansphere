'use client';
// import Image from 'next/image'
// import trade_phere from '@/assets/trade_phere.svg'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { navLinks } from './constant';
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react';
import LogoImg from '../assets/logo.png'
import Image from 'next/image';

const LeftSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const active = (path: string) => path === pathname

  const handleSignOut = () => {
    signOut({
      callbackUrl: window.location.origin, // Redirect after sign-out
    });
  };
  return (
    <div className='hidden lg:flex flex-col justify-between py-10 pl-14 h-screen w-[251px] xl:w-[376px] fixed left-0 top-0 z-50 bg-black'>
      <div>
        <Link href='/' className="logo flex gap-2 mb-[5rem]">

        <div>
          <Image src={LogoImg} className='w-[200px]' alt="alt" />
        </div>
        </Link>

        <div className="navbar flex flex-col gap-[45px]">
          {navLinks.map(({ title, path, icon }) => (
            <Link href={path} key={title} className={`flex gap-7 items-center hover:text-[#18ffffa5] hover:font-bold transition-all duration-300 border-r-[3px] hover:border-[#18FFFF] ${active(path) ? 'border-[#18FFFF] text-[#18FFFFa5] font-bold' : 'text-[#A5A2B8] border-transparent'}`}>
              <Icon icon={icon} className='text-[24px]' />
              <h2 className='text-lg'>{title}</h2>
            </Link>
          ))}
        </div>
      </div>

      {
        session ? (
          <button onClick={handleSignOut} className='bg-[#18FFFF] w-[80%] px-[40px] py-[10px] rounded-[14px] text-[18px] text-[#141414] font-medium mb-[3rem]'>
            Log out
          </button>) : (<button onClick={handleSignOut} className='bg-[#18FFFF] w-[80%] px-[40px] py-[10px] rounded-[14px] text-[18px] text-[#141414] font-medium mb-[3rem]'>
            Log out
          </button>)
      } 
    </div>
  )
}

export default LeftSidebar