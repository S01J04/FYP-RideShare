import { SearchForm } from '@/components/SearchForm'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import routes_data from '@/constants/routes_data'
export const SearchPage = () => {
   useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when component mounts
    }, []);
  // const [routes, setRoutes] = useState([]);

  // useEffect(() => {
  //   // Fetching data from the JSON file (you can replace this with your actual API call)
  //   fetch('/path/to/routes_data.json')
  //     .then((response) => response.json())
  //     .then((data) => setRoutes(data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);
  return (
    <div className=' min-h-[80dvh] justify-start mt-10 mb-14  flex flex-col gap-4 items-center  '>

      <div className="search mt-16 md:my-5 ">
        <h1 className='font-bold text-2xl md:text-5xl'>Where Do You Want To Go</h1>
      </div>
      <div
       className="text-base md:mb-12 outline-none  w-[90%] md:w-[95%] xl:w-[65%]
          rounded-3xl shadow-md flex flex-col md:flex-row items-center "
     >
        <SearchForm />
      </div>
      
      {routes_data.map((route, index) => (
        <div key={index} className=' hover:bg-gray-200 text-md rounded-lg  border-gray-300 w-[90%]  md:w-[80%] xl:w-[65%]'>
          <div className=' w-[94%] flex mx-auto items-center  '>
            <div className='flex items-center'>
              <FontAwesomeIcon className='text-gray-600 dark:text-gray-400' size='xl' icon={faClock} />
            </div>
            <div className='mx-2'>
              <div>{route.route}</div>
              <div className='text-gray-400 text-sm'>{route.passengers}-Passengers</div>
            </div>
          </div>
          <hr  className='border-gray-200 my-3'/>
        </div>
      ))}
    
    </div>
  )
}
