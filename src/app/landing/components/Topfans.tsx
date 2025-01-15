import React from 'react';
import Image from 'next/image';
import jakeImg from '../../../assets/image.png'
const Topfans: React.FC = () => {

  const topFans = [
    {
      img: (jakeImg),
      name: "Jake Waller",
      status: "Premium Fan-card",
      number: "3"
    },
    {
      img: (jakeImg),
      name: "Jake Waller",
      status: "Premium Fan-card",
      number: "3"
    },
    {
      img: (jakeImg),
      name: "Jake Waller",
      status: "Premium Fan-card",
      number: "3"
    },
    {
      img: (jakeImg),
      name: "Jake Waller",
      status: "Premium Fan-card",
      number: "3"
    },
    {
      img: (jakeImg),
      name: "Jake Waller",
      status: "Premium Fan-card",
      number: "3"
    },
   
  ]

  return (
    <div>
      <section >
        <div className='p-3'>
          <header>
            <h5 className='text-[20px] text-[#FFF] font-bold leading-[30px]'>Top Fans</h5>
          </header>

          <div className='flex flex-col gap-1 my-3'>
            {
              topFans.map(({ img, name, status, number }, index) => (
                <div key={index} className='flex items-center justify-between gap-3 my-3'>
                  <div className='flex items-center gap-3'>
                    <Image
                      src={img}
                      alt={name}
                      className='w-[56px] h-[56px] '
                    />
                    <div>
                      <h2 className='text-[#fff] text-[16px] font-medium'>{name}</h2>
                      <p className='text-[#FFFFFFA3] text-[12px]'>{status}</p>
                    </div>
                  </div>
                  <div>
                    <p className='text-[#FFFFFF] text-[20px] font-bold'>{number}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topfans;