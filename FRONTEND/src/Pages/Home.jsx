import { Button } from '@/components/ui/button'
import { faArrowRight, faCalendar, faDollar, faIdCard, faLocationDot, faThunderstorm, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import data from '@/constants/data'

export const Home = () => {
  // Set the default date to today's date in the format yyyy-mm-dd
  const [currentDate, setCurrentDate] = useState('');

 

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format the date as yyyy-mm-dd
    setCurrentDate(formattedDate); // Set the current date
  }, []);
  return (
    <div className='min-h-screen border border-green-700' >
      <section className="relative border border-red-700">
  {/* Background Section with Image and Content */}
  <div className="relative bg-blue-800">
    <div className="img">
      <img
        src="https://static.vecteezy.com/system/resources/previews/025/469/566/non_2x/cartoon-transport-travel-for-banner-classic-sport-car-for-travel-at-night-asphalt-road-near-the-green-grass-and-tree-mountain-and-night-sky-with-dark-clouds-copy-space-flat-vector.jpg"
        alt="Transport banner"
        className="w-full h-52 md:h-96 object-cover"
      />
    </div>
    <div className="content absolute top-0 md:top-10 left-0 right-0 flex items-center justify-center text-white text-2xl md:text-5xl font-bold">
      Your Pick of Rides at Low Prices
    </div>
  </div>

  {/* Search Form Section */}
  <div
    className="absolute top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[80%] xl:w-[75%]
    bg-white border border-gray-300 rounded-3xl shadow-md flex flex-col md:flex-row items-center p-5 md:h-20"
  >
    <form className="flex flex-col md:flex-row w-full items-center justify-around gap-4">
      {/* Pickup Location */}
      <div className="relative flex items-center w-full md:w-[22%]">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Pickup Location"
          className="w-full h-10 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition-all hover:border-blue-500"
        />
      </div>

      {/* Drop Location */}
      <div className="relative flex items-center w-full md:w-[22%]">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Drop Location"
          className="w-full h-10 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition-all hover:border-blue-500"
        />
      </div>

      {/* Date Picker */}
      <div className="relative flex items-center w-full md:w-[18%]">
        <FontAwesomeIcon
          icon={faCalendar}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
        />
        <input
          type="date"
          className="w-full h-10 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition-all hover:border-blue-500"
        />
      </div>

      {/* Passenger Selector */}
      <div className="relative flex items-center w-full md:w-[16%]">
        <FontAwesomeIcon
          icon={faUser}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
        />
        <select
          className="w-full h-10 pl-10 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring focus:ring-blue-400 transition-all hover:border-blue-500"
          defaultValue=""
        >
          <option value="" disabled>Passengers</option>
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
          &#9662;
        </span>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="w-full md:w-[15%] h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
      >
        Search
      </button>
    </form>
  </div>
</section>




      <section className="mt-44 md:mt-12 flex items-center justify-center min-h-[40vh] border border-blue-700 px-4">
  <div className="flex flex-col md:flex-row gap-10 md:gap-20 w-full max-w-6xl mx-auto">
    {/* Div 1 */}
    <div className="flex flex-col items-start text-center md:text-left md:w-1/3 px-4 md:px-0 border border-black">
      <div className="mb-4">
        <FontAwesomeIcon icon={faDollar} color="gray" size="4x" />
      </div>
      <div>
        <div className="header font-bold text-lg md:text-xl mb-2">
          Your pick of rides at low prices
        </div>
        <div className="description text-sm md:text-base text-gray-700">
          No matter where you're going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices.
        </div>
      </div>
    </div>

    {/* Div 2 */}
    <div className="flex flex-col items-start text-center md:text-left md:w-1/3 px-4 md:px-0 border border-black">
      <div className="mb-4">
        <FontAwesomeIcon icon={faThunderstorm} color="gray" size="4x" />
      </div>
      <div>
        <div className="header font-bold text-lg md:text-xl mb-2">
          Scroll, click, tap and go!
        </div>
        <div className="description text-sm md:text-base text-gray-700">
          We take the time to get to know each of our members and bus partners. We check reviews, profiles, and IDs, so you know who you're
          travelling with and can book your ride at ease on our secure platform.
        </div>
      </div>
    </div>

    {/* Div 3 */}
    <div className="flex flex-col items-start text-center md:text-left md:w-1/3 px-4 md:px-0 border border-black">
      <div className="mb-4">
        <FontAwesomeIcon icon={faIdCard} color="gray" size="4x" />
      </div>
      <div>
        <div className="header font-bold text-lg md:text-xl mb-2">
          Safe and secure rides for everyone
        </div>
        <div className="description text-sm md:text-base text-gray-700">
          Travel with confidence knowing that our platform prioritizes safety and security for all members.
        </div>
      </div>
    </div>
  </div>
</section>


      <section className='sec3 mt-10 flex flex-col md:flex-row items-center justify-between gap-5 border border-pink-700 min-h-[50vh] px-4'>
  {/* Image Container */}
  <div className='border w-full md:w-1/2 flex justify-center'>
    <img
      src="./src/assets/carwithphone.jpg"
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


      <section className='sec3 mt-10 flex flex-col md:flex-row-reverse items-center justify-between gap-5 border border-pink-700 min-h-[50vh] px-4'>
  {/* Image Container */}
  <div className='border w-full md:w-1/2 flex justify-center'>
    <img
      src="./src/assets/car2.jpg"
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

<section className='border flex items-center justify-center  min-h-[50vh] md:min-h-[30vh] mt-5 flex-col border-black-600 px-4'>
  <div className='border border-blue-700 md:w-[80%]  mx-auto p-4 md:p-8'>
    {/* Header */}
    <div className='border text-start text-xl md:text-3xl font-bold border-black p-2'>
      Where do you want a ride to?
    </div>

    {/* Ride Options */}
    <div className='border mt-5 flex flex-col md:flex-row items-center justify-start gap-5 border-black'>
      <div className='border border-black w-full md:w-[250px]  flex items-center justify-between px-5 py-3 rounded-md shadow-sm'>
        <span>Peshawar</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <div className='border border-black w-full md:w-[250px] flex items-center justify-between px-5 py-3 rounded-md shadow-sm'>
        <span>Peshawar</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <div className='border border-black w-full md:w-[250px] flex items-center justify-between px-5 py-3 rounded-md shadow-sm'>
        <span>Peshawar</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  </div>
</section>

<section className="my-10 ">
      <Carousel 
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-[70%]  mx-auto">
        <CarouselContent className="-ml-1">
          {data.map((item) => (
            <CarouselItem key={item.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6 gap-2">
                    <img
                       
                      src={item.image}
                      alt={item.title}
                      className=" h-[250px] w-[100%] object-cover  rounded-md"
                    />
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <span className="text-blue-500 font-bold">{item.price}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>

    </div>
  )
}
