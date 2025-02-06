import { Button } from '@/components/ui/button'
import React from 'react'
const Section4 = () => {
  return (
    <section className='sec3 text-subtext   -pink-600 mt-10 flex flex-col md:flex-row-reverse items-center justify-between gap-5  -pink-700 min-h-[50vh] px-4'>
      {/* Image Container */}
      <div className=' w-full md:w-1/2 flex justify-center'>
        <img
          src="./src/assets/heroimgs.svg"
          alt="Car"
          className="max-w-[70%] h-auto object-cover"
        />
      </div>
    
      {/* Content Container */}
      <div className=' w-full md:w-1/2 flex flex-col items-center text-center p-4 md:p-8'>
        {/* Header */}
        <div className="header text-heading  -black font-bold text-xl md:text-4xl">
          Help us keep you safe from scams
        </div>
    
        {/* Description */}
        <div className="desc  -black text-sm md:text-lg mt-4 max-w-lg">
          At BlaBlaCar, we're working hard to make our platform as secure as it can be. But when scams do happen, we want you to know exactly how to avoid and report them. Follow our tips to help us keep you safe.
        </div>
    
        {/* Button */}
        <div className='flex justify-center mt-5 w-full'>
          <Button className='rounded-3xl  ' variant="default">Click here</Button>
        </div>
      </div>
    </section>
  )
}

export default Section4