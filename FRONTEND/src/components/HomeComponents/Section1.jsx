
import React, { useEffect, useState } from 'react'
import { SearchForm } from '../SearchForm';
export const Section1 = () => {
  
  return (
     <section className="relative border border-red-700">
     {/* Background Section */}
     <div className="relative bg-blue-800 dark:bg-gray-900">
       <div className="img">
         <img
           src="https://static.vecteezy.com/system/resources/previews/025/469/566/non_2x/cartoon-transport-travel-for-banner-classic-sport-car-for-travel-at-night-asphalt-road-near-the-green-grass-and-tree-mountain-and-night-sky-with-dark-clouds-copy-space-flat-vector.jpg"
           alt="Transport banner"
           className="w-full h-52 md:h-96 object-cover"
         />
       </div>
       <div className="content absolute top-0 md:top-10 left-0 right-0 flex items-center justify-center text-white dark:text-gray-300 text-2xl md:text-5xl font-bold">
         Your Pick of Rides at Low Prices
       </div>
     </div>
   
     {/* Search Form Section */}
     <SearchForm/>
   </section>
  )
}
