import Image from 'next/image'
import React from 'react'
import LogoImg from '../assets/logo.png'
// import { Icon } from '@iconify/react/dist/iconify.js'
const Footer = () => {
  return (
    <div className='border-t-2 border-[#fff] md:max-w-[70%] m-auto'>
      <header className='flex justify-between items-center gap-3 py-6 px-2'>
        <div>
          <Image src={LogoImg} className='w-[200px]' alt="alt" />
        </div>
        <div className='border-[#e5e5e593] border-[1px]'>
         
        </div>

        <div>
          <p className='text-[#E5E5E5] text-[18px]'>2023.</p>
        </div>
      </header>
    </div>
  )
}

export default Footer