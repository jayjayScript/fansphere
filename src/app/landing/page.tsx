import React from 'react'

import TopCelebrities from './components/TopCelebrities'
import Fancard from './components/Fancard'
import LatestArtist from './components/LatestCelebritiest'
import PopularFanCard from './components/PopularFanCard'
import Topfans from './components/Topfans'
import Landing from './components/Landing'
import LeftSidebar from '@/components/LeftBar'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className="overflow-hidden md:flex">
      <NavBar />
      <div className="flex-1 lg:block">
        <LeftSidebar />
      </div>
      <div className='lg:max-w-[75%] flex-[4] md:pt-10 relative'>
        <div className='md:absolute left-[800px] top-[80px]'>
          <div className='absolute -left-[200px] md:-left-[500px] top-[200px] w-[406.15px] h-[406.15px] bg-gradient-to-r from-[#FF4081] to-[#18FFFF] rounded-full -z-50 blur-[70px] md:blur-[150px]'>

          </div>
          <div className='absolute -right-[120px] md:-right-[280px] top-[50px] w-[406.15px] h-[406.15px] bg-gradient-to-r from-[#9B51E0] to-[#18FFFF] rounded-full -z-50 blur-[70px] md:blur-[150px]'>

          </div>
        </div>

        <div className='absolute -left-[250px] md:left-[400px] top-[960px] w-[506.15px] h-[506.15px] bg-gradient-to-r from-[#FF4081] to-[#18FFFF] rounded-full -z-50 blur-[80px] opacity-60'>

        </div>

        <div className='absolute bottom-[1100px] md:bottom-[1900px] left-[200px] md:left-[800px] opacity-60 -z-50'>
          <div className='absolute -left-[500px] top-[200px] w-[406.15px] h-[406.15px] bg-gradient-to-r from-[#FF4081] to-[#18FFFF] rounded-full -z-50 blur-[80px]'>

          </div>
          <div className='absolute -right-[290px] top-[50px] w-[406.15px] h-[406.15px] bg-gradient-to-r from-[#9B51E0] to-[#18FFFF] rounded-full -z-50 blur-[80px]'>

          </div>
        </div>
        <div className='flex flex-col gap-[2rem]'>
          <Landing />
          <TopCelebrities />
          <Fancard />
          <LatestArtist />
          <PopularFanCard />
          <Topfans />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default page