import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import LeftSidebar from '@/components/LeftBar';


interface Card {
  title: string;
  value: string;
  benefits: string[];
  image: string
}

const CardDetailPage = ({ card: { title, value, benefits, image }, onClose }: { card: Card, onClose: () => void }) => {
  return (
    <div className="overflow-hidden md:flex">
      <div className="flex-1 lg:block">
        <LeftSidebar />
      </div>
      <div className="fixed top-0 left-0 lg:left-[25%] flex-[3] lg:max-w-[75%] p-4 py-[4rem] w-full h-full bg-[#000000CC] backdrop-blur-md flex items-center justify-center z-50">
        <div>
          <div className='cursor-pointer text-[#fff] lg:mt-[4rem]'>
            <Icon icon="material-symbols-light:close-rounded" width="34" height="34" onClick={onClose}></Icon>
          </div>

          <div className='sm:flex items-center'>
            <div className='w-full lg:w-[70%] h-full flex-[2]'>
              <Image src={image} alt="alt" width={507} height={251} />
            </div>

            <div className='flex-1 w-full'>
              <div className=''>
                <h2 className='text-[32px] lg:text-[40.48px] text-[#fff] font-bold leading-[48px] lg:leading-[60.73px]'>{title} <br />
                  Fan-card {value}
                </h2>

                <ul className='text-[12px] lg:text-[15.18px] leading-[20px] list-disc px-4'>
                  {
                    benefits.map((benefit, index) => (
                      <li key={index} className='text-[#fff]'>{benefit}</li>
                    ))
                  }
                </ul>
              </div>

              <button className="text-[#fff] text-[16px] bg-gradient-to-l from-[#18FFFF] to-[#9B51E0] px-3 py-3 rounded-[20px] flex items-center justify-center gap-1 mt-4 w-full">
                <Icon
                  icon="solar:card-bold"
                  width="21"
                  height="20"
                ></Icon>
                Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetailPage