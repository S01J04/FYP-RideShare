import { Button } from '@/components/ui/button'
import { faCalendar, faDollar, faIdCard, faLocationDot, faThunderstorm, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fullscreen } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export const Home = () => {
  // Set the default date to today's date in the format yyyy-mm-dd
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format the date as yyyy-mm-dd
    setCurrentDate(formattedDate); // Set the current date
  }, []);
  return (
    <div className='min-h-screen' >
      <section className='relative'>
        <div className='relative bg-blue-800  md:block'>
          <div className="img">
            <img width="100%" className='h-52 md:h-96 object-cover' src="https://static.vecteezy.com/system/resources/previews/025/469/566/non_2x/cartoon-transport-travel-for-banner-classic-sport-car-for-travel-at-night-asphalt-road-near-the-green-grass-and-tree-mountain-and-night-sky-with-dark-clouds-copy-space-flat-vector.jpg" alt="" />
          </div>
          <div className="content absolute top-0 md:top-10 text-white text-2xl md:text-5xl   font-bold left-0 right-0  flex items-center justify-center">
            Your Pick of rides at low prices
          </div>
        </div>
        <div
          className=" rounded-3xl
  border absolute h-[45vh] top-[100%] md:top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  w-[80%] flex flex-col md:flex-row 
  xl:w-[75%] md:w-[95%] md:bottom-1/5 md:left-1/2 bg-white 
  md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:h-20 items-center"
        >
          <form className="flex p-3 flex-col justify-around md:flex-row w-full h-full md:items-center md:justify-around" action="">

            {/* Pickup Location Input with Icon */}
            <div className="relative flex items-center   md:h-full  md:w-[25%]">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                size="lg"
              />
              <input
                type="text"
                placeholder="Pickup Location"
                className=" md:w-full h-10 md:h-[70%] pl-10 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition-all hover:border-blue-500"
              />
            </div>

            {/* Drop Location Input with Icon */}
            <div className="relative flex  md:h-full items-center w-full md:w-[25%] mt-2 md:mt-0 md:ml-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                size="lg"
              />
              <input
                type="text"
                placeholder="Drop Location"
                className="w-full h-10 md:h-[70%] pl-10 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition-all hover:border-blue-500"
              />
            </div>

            {/* Date Input with Icon */}
            <div className="relative flex items-center  md:h-full w-full md:w-[14%] mt-2 md:mt-0 md:ml-2">
              <FontAwesomeIcon
                icon={faCalendar}
                className="absolute pointer-events-none top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                size="lg"
              />
              <input
                type="date"
                placeholder="Date"
                onChange={(e) => setCurrentDate(e.target.value)}
                value={currentDate} // Use the currentDate state as the value
                className="w-full h-10 md:h-[70%] md:w/6 pl-10 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition-all hover:border-blue-500"
              />
            </div>

            {/* Passengers Select with Icon */}
            <div className="relative flex items-center w-full   md:h-[70%] md:w-[13%] mt-2 md:mt-0 md:ml-2">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                size="lg"
              />
              <select
                className="w-full h-full  pl-10 border border-gray-300 p-2 pr-8 rounded-md focus:outline-none focus:ring focus:ring-blue-400 mt-2 md:mt-0 md:ml-2 appearance-none"
                defaultValue=""
              >
                <option value="" disabled><span className='hidden'>Passengers</span></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              {/* Custom Arrow */}
              <span className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
                &#9662;
              </span>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full md:w-[15%] h-10 md:h-4/6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all mt-2 md:mt-0 md:ml-2"
            >
              Search
            </button>
          </form>
        </div>
      </section>
      <section className="mt-44 flex items-center justify-center md:mt-0 min-h-[40vh] border border-black">
  <div className="flex flex-col gap-10 md:mx-[300px] md:gap-20 md:flex-row border border-black">
    {/* Div 1 */}
    <div className="md:flex-1 md:px-0 px-5 border border-black">
      <div>
        <FontAwesomeIcon icon={faDollar} color='gray' size="5x" />
      </div>
      <div>
        <div className="header font-bold text-lg">Your pick of rides at low prices</div>
        <div className="description">
          No matter where you're going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices.
        </div>
      </div>
    </div>

    {/* Div 2 */}
    <div className="flex-1 px-5 md:px-0 border border-black">
      <div>
        <FontAwesomeIcon icon={faThunderstorm} color='gray' size="5x" />
      </div>
      <div>
        <div className="header font-bold text-lg">Scroll, click, tap and go!</div>
        <div className="description">
          We take the time to get to know each of our members and bus partners. We check reviews, profiles, and IDs, so you know who you're
          travelling with and can book your ride at ease on our secure platform.
        </div>
      </div>
    </div>

    {/* Div 3 */}
    <div className="flex-1 px-5 md:px-0 border border-black">
      <div>
        <FontAwesomeIcon icon={faIdCard} color='gray' size="5x" />
      </div>
      <div>
        <div className="header font-bold text-lg">Your pick of rides at low prices</div>
        <div className="description">
          No matter where you're going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices.
        </div>
      </div>
    </div>
  </div>
</section>

<section className='sec3 mt-10 md:mt-0 flex flex-col md:flex-row items-center justify-between gap-5 border border-black min-h-[50vh]'>
  <div className='border flex-1 justify-center flex border-black'>
    <img src="./src/assets/carwithphone.jpg" alt="" />
  </div>
  <div className='border flex-1 h-[30vh] border-black'>
    <div className="header border text-center border-black md:text-4xl font-bold">Help us keep you safe from scams</div>
    <div className="desc border border-black md:text-lg text-center mx-auto md:w-[50%]">
    At BlaBlaCar, we're working hard to make our platform as secure as it can be. But when scams do happen, we want you to know exactly how to avoid and report them. Follow our tips to help us keep you safe.
    </div>
    <div className='mx-auto border justify-center flex border-black mt-5 w-full'>
    <Button variant="default"  >Click here</Button>

    </div>
  </div>
</section>

    </div>
  )
}
