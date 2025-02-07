
import React, { useEffect, useState } from 'react'
import { SearchForm } from '../SearchForm';
export const Section1 = () => {
  
  return (
     <section className="relative  top-5 ">
     {/* Background Section */}
     <div className="relative ">
       <div className="img">
         <img
           src="src/assets/img.svg"
           alt="Transport banner"
           className="w-full h-52 opacity-100 md:h-72 bg-right object-cover"
         />
       </div>
       
       <div className="content bg-black h-full  absolute top-0   md:top-0 left-0 right-0 flex items-start py-10 bg-opacity-30 justify-center text-white dark:text-gray-300 text-center text-3xl md:text-6xl font-bold">
         Your Pick of Rides at Low Prices
       </div>
     </div>
   
     {/* Search Form Section */}
     <div
       className="absolute text-base outline-none  top-[155%] md:top-[100%]  left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[95%] lg:w-[85%] xl:w-[95%] 2xl:w-[65%]
          rounded-2xl  shadow-md flex flex-col md:flex-row items-center justify-between  "
     >
     <SearchForm/>        

     </div>
  
   </section>
  )
}
