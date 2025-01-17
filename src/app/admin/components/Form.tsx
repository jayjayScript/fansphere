"use client"
import React, { useState } from 'react'
import axios from 'axios';
import img from '@/assets/pexels-steve-28574351.jpg'
import Image from 'next/image'

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    img: "",
    text: "",
    para1: "",
    para2: "",
    para3: "",
    hitSong: "",
    platforms: {
      spotify: "",
      soundCloud: "",
      youtube: "",
      instagram: "",
      appleMusic: "",
      beatport: "",
      bandcamp: "",
      twitter: "",
      deezer: "",
      audiomack: "",
      twitch: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.includes("platforms")) {
      const platformKey = name.split(".")[1]
      setFormData((prevData) => ({
        ...prevData,
        platforms: { ...prevData.platforms, [platformKey]: value },
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "https://artistbackend.onrender.com/api/artists",
        data: formData,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      alert("Celebrity added successfully!");
      console.log("Successful", response.data)
    } catch (error) {
      alert("Celebrity Upload FAILED")
      console.log("Failed", error)
    }
  }
  return (
    <div className='md:max-w-[50%] m-auto'>
      <form action="" onSubmit={handleSubmit} className='p-4 border-[#fdfdfd65] border-[1px] bg-[#15183d1c] rounded-lg my-3 grid grid-cols-2 gap-4 gap-y-7'>
        <div className='flex flex-col'>
          <label htmlFor="name" className='text-[#fff] font-bold'>Celebrity Name</label>
          <input type="text" id='name' className='bg-transparent text-[#ffffff96] border-b-[1px] border-[#ffffff61] p-2 outline-none rounded-lg' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="title" className='text-[#fff] font-bold'>Celebrity title</label>
          <input type="text" id='title' className='bg-transparent text-[#ffffff96] border-b-[1px] border-[#ffffff61] p-2 outline-none rounded-lg' />
        </div>
        <div className='flex flex-col col-span-2'>
          <label htmlFor="imgUrl" className='text-[#fff] font-bold flex gap-2 items-center'>Celebrity image link
            <div className='w-[100px] h-[20px] overflow-hidden rounded-lg flex-1'>
              <Image src={img} className='w-[300px] h-[220px] object-fill rounded-e-lg hover:scale-150 transition-all duration-300 ease-linear' alt="alt" />
            </div>
          </label>
          <input type="text" id='imgUrl' className='bg-transparent text-[#ffffff96] border-b-[1px] border-[#ffffff61] p-2 outline-none rounded-lg' />
        </div>

        <div className='col-span-2'>
          <h1 className='text-[#ffffff94] font-bold'>About Celebrity</h1>
          <small className='text-[#ffffff62] text-[10px]'>celebrity description should be separeted into 3 paragraphs</small>
          <div className='mt-3'>
            <label htmlFor="para1" className='hidden'>.</label>
            <textarea name="para1" id="para1" placeholder='paragraph 1' className='bg-[#ffffff0e] text-[#ffffff7c] p-2 outline-none rounded-lg w-full'></textarea>
          </div>
          <div>
            <label htmlFor="para2" className='hidden'>.</label>
            <textarea name="para2" id="para2" placeholder='paragraph 2' className='bg-[#ffffff0e] text-[#ffffff96] p-2 outline-none rounded-lg w-full'></textarea>
          </div>
          <div>
            <label htmlFor="para3" className='hidden'>.</label>
            <textarea name="para3" id="para3" placeholder='paragraph 2' className='bg-[#ffffff0e] text-[#ffffff96] p-2 outline-none rounded-lg w-full'></textarea>
          </div>
        </div>

        <div className='col-span-2'>
          <label htmlFor="celebBest" className='text-[#fff] text-[12px] font-bold flex gap-2 items-center'>Celebrity best moments or performance</label>
          <input type="text" id="para3" className='bg-[#ffffff0e] text-[#ffffff96] p-2 outline-none rounded-lg w-full'/>
        </div>

        <button className='bg-[#28d2fd] text-[14px] font-medium p-2 w-full col-span-2 rounded-sm'>
          Add Celebrity
        </button>
      </form>
    </div>
  )
}

export default Form