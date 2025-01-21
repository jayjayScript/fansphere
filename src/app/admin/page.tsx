import React from 'react'
import img from '@/assets/pexels-steve-28574351.jpg'
import Image from 'next/image'
import Form from './components/Form'

const AdminPage: React.FC = () => {
  return (
    <div>
      <div className='p-4 m-auto'>
        <header className='md:max-w-[80%] m-auto border-[#ffffff30] border-[1px] rounded-lg bg-white/10 flex'>
          <div className='p-4'>
            <h1 className='text-[#fff] text-[30px] md:text-[60px] font-bold my-1 '>
              WELCOME ADMIN
            </h1>
            <p className='text-[#ffffff75] md:text-[25px]'> What do you have fo us today!!</p>
          </div>
          <div className='w-[220px] md:w-full md:flex-[4] h-[180px] overflow-hidden rounded-e-lg'>
            <Image src={img} className='w-[300px] md:w-full h-[220px] object-cover rounded-e-lg hover:scale-150 transition-all duration-300 ease-linear' alt="alt"/>
          </div>
        </header>

        <div className='my-4'>
          <Form />
        </div>
      </div>
    </div>
  )
}

export default AdminPage