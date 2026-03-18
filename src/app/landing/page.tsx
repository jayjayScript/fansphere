import React from 'react'

// import TopCelebrities from './components/TopCelebrities'
import Fancard from './components/Fancard'
import LatestArtist from './components/LatestCelebritiest'
import PopularFanCard from './components/PopularFanCard'
import CelebrityFanCarousel from './components/CelebrityFanCarousel'
import Landing from './components/Landing'
import LeftSidebar from '@/components/LeftBar'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <NavBar />
      <LeftSidebar />
      
      <main className="lg:pl-[251px] xl:pl-[346px] transition-all duration-300">
        <div className='relative min-h-screen'>
          {/* Background Glows - Responsive Positioning */}
          <div className='absolute top-0 right-0 w-full h-full pointer-events-none -z-10 overflow-hidden'>
            <div className='absolute top-[10%] -right-[150px] md:-right-[200px] w-[500px] h-[500px] bg-gradient-to-r from-[#FF4081] to-[#18FFFF] rounded-full blur-[100px] md:blur-[150px] opacity-40' />
            <div className='absolute top-[40%] -left-[150px] md:-left-[200px] w-[500px] h-[500px] bg-gradient-to-r from-[#9B51E0] to-[#18FFFF] rounded-full blur-[100px] md:blur-[150px] opacity-40' />
            <div className='absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-gradient-to-r from-[#FF4081]/30 to-[#18FFFF]/30 rounded-full blur-[120px] opacity-30' />
          </div>

          <div className='flex flex-col gap-8 pb-10'>
            <Landing />
            <Fancard />
            <LatestArtist />
            <PopularFanCard />
            <CelebrityFanCarousel />
            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}

export default page
