import React, { useEffect, useState } from 'react'
import {  faCalendar, faLocationDot, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DatePicker } from './DatePicker';
import  SelectnoofPassengers  from './Select';
export const SearchForm = () => {
    const [currentDate, setCurrentDate] = useState('');

 

    useEffect(() => {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0]; // Format the date as yyyy-mm-dd
      setCurrentDate(formattedDate); // Set the current date
    }, []);
  return (
    
       <form className="flex flex-col md:flex-row w-full items-center justify-around gap-4">
         {/* Pickup Location */}
         <div className="relative flex items-center w-full md:w-[22%]">
           <FontAwesomeIcon
             icon={faLocationDot}
             className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
           />
           <input
             type="text"
             placeholder="Pickup Location"
             className="w-full h-10 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-400 transition-all hover:border-blue-500"
           />
         </div>
   
         {/* Drop Location */}
         <div className="relative flex items-center w-full md:w-[22%]">
           <FontAwesomeIcon
             icon={faLocationDot}
             className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
           />
           <input
             type="text"
             placeholder="Drop Location"
             className="w-full h-10 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-400 transition-all hover:border-blue-500"
           />
         </div>
   
         {/* Date Picker */}
         <div className="relative flex items-center w-full md:w-[18%]">
           <FontAwesomeIcon
             icon={faCalendar}
             className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
           />
           {/* <input
             type="date"
             value={currentDate}
             onChange={(e) => setCurrentDate(e.target.value)}
             className="w-full h-10 pl-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition-all hover:border-blue-500"
           /> */}
           <DatePicker/>
         </div>
   
         {/* Passenger Selector */}
         <div className="relative flex items-center w-full md:w-[16%]">
           <FontAwesomeIcon
             icon={faUser}
             className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
           />
           {/* <select
             className="w-full h-10 pl-10 border text-gray-500 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md appearance-none focus:outline-none focus:ring focus:ring-blue-400 transition-all hover:border-blue-500"
             defaultValue=""
           >
             <option value="" disabled>Passengers</option>
             {[...Array(10)].map((_, i) => (
               <option key={i} value={i + 1}>{i + 1}</option>
             ))}
           </select> */}
            <SelectnoofPassengers/>  
        
         </div>
   
         {/* Search Button */}
         <button
           type="submit"
           className="w-full md:w-[15%] h-10 bg-blue-500 dark:bg-blue-700 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 transition-all"
         >
           Search
         </button>
       </form>
 
  )
}
