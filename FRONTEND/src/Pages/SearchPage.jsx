import { SearchForm } from '@/components/SearchForm'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import routes_data from '@/constants/routes_data'
export const SearchPage = () => {
  // const [routes, setRoutes] = useState([]);

  // useEffect(() => {
  //   // Fetching data from the JSON file (you can replace this with your actual API call)
  //   fetch('/path/to/routes_data.json')
  //     .then((response) => response.json())
  //     .then((data) => setRoutes(data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);
  return (
    <div className='min-h-[calc(100vh-64px-343px )] mb-14 border flex flex-col items-center  border-black'>
      <div className="search my-5">
        <h1 className='font-bold text-2xl md:text-5xl'>Where Do You Want To Go</h1>
      </div>
      <div
        className="w-[90%] mb-5 md:w-[80%] xl:w-[75%]   border border-gray-300 dark:border-gray-600 rounded-3xl shadow-md  md:flex-row items-center p-5 bg-white dark:bg-gray-800"
      >
        <SearchForm />
      </div>
      
      {routes_data.map((route, index) => (
        <div key={index} className='border-t-2 last:border-b-2  border-gray-300 w-[90%]  md:w-[80%] xl:w-[65%]'>
          <div className='my-3 w-[94%] flex mx-auto'>
            <div className='flex items-center'>
              <FontAwesomeIcon color='gray' size='2xl' icon={faClock} />
            </div>
            <div className='mx-2'>
              <div>{route.route}</div>
              <div className='text-gray-400'>{route.passengers}-Passengers</div>
            </div>
          </div>
        </div>
      ))}
    
    </div>
  )
}
