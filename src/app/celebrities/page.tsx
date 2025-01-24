import React from 'react';
import TopCelebrities from './components/TopCelebrities';
import CelebritiesList from './components/Celebrities';
import LeftSidebar from '@/components/LeftBar';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';


const CelebritiesPage: React.FC = () => {
  return (
    <div className="overflow-hidden lg:flex">
      <NavBar />
      <div className="flex-1 lg:block">
        <LeftSidebar />
      </div>
      <div className='lg:max-w-[75%] m-auto relative flex-[4] md:pt-10 '>
        <div className='md:absolute left-[800px] top-[80px] opacity-80'>
          <div className='absolute -left-[200px] md:-left-[500px] top-[200px] w-[406.15px] h-[406.15px] bg-gradient-to-r from-[#FF4081] to-[#18FFFF] rounded-full -z-50 blur-[70px] md:blur-[150px]'>

          </div>
          <div className='absolute -right-[120px] md:-right-[280px] top-[50px] w-[406.15px] h-[406.15px] bg-gradient-to-r from-[#9B51E0] to-[#18FFFF] rounded-full -z-50 blur-[70px] md:blur-[150px]'>

          </div>
        </div>
        <TopCelebrities />
        <CelebritiesList />
        <Footer />
      </div>
    </div>
  );
};

export default CelebritiesPage