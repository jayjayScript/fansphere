'use client';
// import Image from 'next/image'
// import trade_phere from '@/assets/trade_phere.svg'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { navLinks } from './constant';
import { usePathname } from 'next/navigation'


const LeftSidebar = () => {
  const pathname = usePathname()
  const active = (path: string) => path === pathname
  return (
    <div className='hidden lg:flex flex-col py-10 pl-14 h-screen w-[251px] xl:w-[376px] fixed left-0 top-0 z-50 bg-black'>
      <Link href='/' className="logo flex gap-2 mb-14">
        
        <h1 className='text-xl text-[#fff]'>Artist<strong>Phere</strong></h1>
      </Link>

      <div className="navbar flex flex-col gap-[50px]">
        {navLinks.map(({title, path, icon}) => (
          <Link href={path} key={title} className={`flex gap-7 items-center hover:text-[#18ffffa5] hover:font-bold transition-all duration-300 border-r-[3px] hover:border-[#18FFFF] ${active(path) ? 'border-[#18FFFF] text-[#18FFFFa5] font-bold' : 'text-[#A5A2B8] border-transparent'}`}>
            <Icon icon={icon} className='text-[24px]' />
            <h2 className='text-lg'>{title}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LeftSidebar