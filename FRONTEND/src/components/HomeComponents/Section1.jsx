
import React, { useEffect, useState } from 'react'
import { SearchForm } from '../SearchForm';
export const Section1 = () => {
  
  return (
     <section className="relative ">
     {/* Background Section */}
     <div className="relative ">
       <div className="img">
         <img
           src="https://static.vecteezy.com/system/resources/previews/025/469/566/non_2x/cartoon-transport-travel-for-banner-classic-sport-car-for-travel-at-night-asphalt-road-near-the-green-grass-and-tree-mountain-and-night-sky-with-dark-clouds-copy-space-flat-vector.jpg"
           alt="Transport banner"
           className="w-full h-52 md:h-96 object-cover"
         />
       </div>
       <div className="content   absolute top-20 md:top-32  md:top-15 left-0 right-0 flex items-center justify-center text-white dark:text-gray-300 text-center text-3xl md:text-6xl font-bold">
         Your Pick of Rides at Low Prices
       </div>
     </div>
   
     {/* Search Form Section */}
     <div
       className="absolute text-base outline-none  top-[155%] md:top-[105%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[95%] xl:w-[75%]
          rounded-3xl shadow-md flex flex-col md:flex-row items-center p-5 md:h-20 bg-primary"
     >
     <SearchForm/>        

     </div>
  
   </section>
  )
}
