import React from 'react';
import Purchase from './components/Purchase';
import LeftSidebar from '@/components/LeftBar';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const PurchasePage: React.FC = () => {
  return (
    <div className="overflow-hidden lg:flex">
      <NavBar />
      <div className="flex-1 lg:block">
        <LeftSidebar />
      </div>
      <div className='lg:max-w-[75%] m-auto flex-[4] md:pt-10 relative'>
        <div className='md:absolute left-[800px] top-[80px] opacity-50'>
          <div className='absolute -left-[200px] md:-left-[500px] top-[200px] w-[406.15px] h-[406.15px] bg-gradient-to-r from-[#FF4081] to-[#18FFFF] rounded-full -z-50 blur-[70px] md:blur-[150px]'>

          </div>
          <div className='absolute -right-[120px] md:-right-[280px] top-[50px] w-[406.15px] h-[406.15px] bg-gradient-to-r from-[#a45ae9] to-[#18FFFF] rounded-full -z-50 blur-[70px] md:blur-[150px]'>

          </div>
        </div>
        <Purchase />
      <Footer />
      </div>
    </div>
  );
};

export default PurchasePage;