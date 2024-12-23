import { Button } from '@/components/ui/button'
import React from 'react'
const Section4 = () => {
  return (
    <section className='sec3 mt-10 flex flex-col md:flex-row-reverse items-center justify-between gap-5 border border-pink-700 min-h-[50vh] px-4'>
      {/* Image Container */}
      <div className='border w-full md:w-1/2 flex justify-center'>
        <img
          src="./src/assets/car2new.png"
          alt="Car"
          className="max-w-full h-auto object-cover"
        />
      </div>
    
      {/* Content Container */}
      <div className='border w-full md:w-1/2 flex flex-col items-center text-center p-4 md:p-8'>
        {/* Header */}
        <div className="header border border-black font-bold text-xl md:text-4xl">
          Help us keep you safe from scams
        </div>
    
        {/* Description */}
        <div className="desc border border-black text-sm md:text-lg mt-4 max-w-lg">
          At BlaBlaCar, we're working hard to make our platform as secure as it can be. But when scams do happen, we want you to know exactly how to avoid and report them. Follow our tips to help us keep you safe.
        </div>
    
        {/* Button */}
        <div className='flex justify-center mt-5 w-full'>
          <Button variant="default">Click here</Button>
        </div>
      </div>
    </section>
  )
}

export default Section4