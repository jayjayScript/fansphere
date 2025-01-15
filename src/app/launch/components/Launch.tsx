"use client"

import React from 'react';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/navigation';


const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const pages = [
  {
    image: '/img/launch.png',
    text: 'Empowering Fans. Elevating Artists',
    buttonText: 'Get started',
  },
  {
    image: '/img/launch2.png',
    text: 'Find the perfect card to match your fandom',
    buttonText: 'Continue',
  },
  {
    image: '/img/launch3.png',
    text: 'Climb the ranks and enjoy special benefits',
    buttonText: 'Continue',
  },
  // Add more pages as needed
];

const Launch: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const router = useRouter()

  const handleNextPage = () => {
    if (currentPage === pages.length - 1) {
      router.replace('/landing')
    } else {
      setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
    }
  };

  return (
    <div className={`h-screen w-full ${poppins.variable}`}>
      <div className="relative h-screen w-full overflow-hidden bg-black">
        {pages.map((page, index) => (
          <section
            key={index}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out bg-cover md:bg-auto bg-no-repeat bg-center ${index === currentPage ? 'transform translate-x-0' : 'transform translate-x-full'
              }`}
            style={{ backgroundImage: `url(${page.image})` }}
          >
            <div className="h-screen w-full flex justify-center items-end relative">
              <div className="antialiased backdrop-filter backdrop-blur-sm bg-gradient-to-t from-[#D9D9D94D] via-[#D9D9D900] to-transparent w-full p-4 py-[5rem] relative z-10">
                <div className='md:w-[55%] md:px-[7rem]'>
                  <h1 className='text-[#fff] text-[32px] md:text-[62px] font-bold pt-4'>{page.text}</h1>
                  <button
                    className='my-4 bg-gradient-to-l from-[#18FFFF] to-[#9B51E0] text-[#fff] text-[18px] font-medium rounded-[20px] p-3 w-full md:w-[50%]'
                    onClick={handleNextPage}
                  >
                    {page.buttonText}
                  </button>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent pointer-events-none" style={{ filter: 'blur(10px)' }}></div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Launch;