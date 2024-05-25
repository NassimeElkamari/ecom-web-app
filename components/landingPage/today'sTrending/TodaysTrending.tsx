import Image from 'next/image'
import React from 'react'
import { HiOutlineArrowLeft , HiOutlineArrowRight } from "react-icons/hi";


const TodaysTrending = () => {
  return (
    <div className='container flex items-end h-[80vh] mt-[10vh]'>
      <div className='relative pl-[5vw] w-[60%]'>        
        <Image src={'/assets/todaysTrending/c.png'} alt='k' unoptimized={true} width={100} height={100} className='w-[600px] h-[400px]  rounded-3xl'/>
          <h1 className='mix-blend-difference absolute top-[-5%] left-[0%] text-white text-4xl font-serif tracking-wider'>Kolej Mont <br/>Oversized <br/> Sweatshirt </h1>
        <h1 className='mix-blend-difference text-3xl absolute left-[83%] bottom-[80%] font-serif text-white font-medium border rounded-full p-2 border-white'>T𝚘̷da𝓎&#39;s</h1>
        <div className='w-[60px] h-[60px] mix-blend-difference absolute rounded-full left-[15%]   top-[92%] bg-black border-2 p-2'>
          <div className='rounded-full bg-[#D8BEB0] w-[40px] h-[40px] '></div>
        </div>
      </div>
      <div className='flex container relative w-[40%] gap-2 justify-around items-center mr-8'>
        <h1 className='absolute mix-blend-difference text-3xl text-white bottom-[133%] right-[77%] font-serif'>Trⅇndinℊs</h1>
        <div >
          <div className='absolute w-[50px] h-[50px] rounded-full left-[75%] bottom-[155%] z-20'><Image src={'/assets/todaysTrending/marron.jpg'} alt='k' unoptimized={true} width={80} height={80} className='w-[50px] h-[50px] rounded-3xl'/></div>
          <div className='absolute w-[50px] h-[50px] bg-[#543233]  rounded-full left-[75%] bottom-[140%] z-10'></div>
          <div className='absolute w-[50px] h-[50px] border-white border-[1px] rounded-full left-[75%] bottom-[125%]'></div>
          <div className='absolute w-[180px] h-[110px]  left-[15%] bottom-[155%]'><Image src={'/assets/todaysTrending/signature.png'} alt='k' unoptimized={true} width={180} height={180} /></div>
          {/* <div className='absolute w-[180px] left-[20%] bottom-[155%]'><Image src={'/assets/signature3.png'} alt='k' unoptimized={true} width={180} height={180} /></div> */}
        </div>
        <div className='flex items-center justify-between absolute bottom-[105%] w-[30%] left-[41%] '>
          <button className='w-[60px] border-white border-[1px] rounded-full p-1'><HiOutlineArrowLeft className='w-[50px] h-[30px]'/></button>
          <button className='w-[60px] border-white border-[1px] rounded-full p-1'><HiOutlineArrowRight className='w-[50px] h-[30px]'/></button>
        </div>
        <Image src={'/assets/todaysTrending/2.jpg'} alt='k' unoptimized={true} width={80} height={80} className='w-[150px] h-[220px] rounded-3xl'/>
        <Image src={'/assets/todaysTrending/3.jpg'} alt='k' unoptimized={true} width={80} height={80} className='w-[150px] h-[220px] rounded-3xl'/>
      </div>
    </div>
  )
}

export default TodaysTrending
