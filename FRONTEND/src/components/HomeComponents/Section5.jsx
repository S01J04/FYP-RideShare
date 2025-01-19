
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
export const Section5 = () => {
  return (
    <section className=' flex bg-primary  items-center justify-center  -pink-600   min-h-[30vh] md:min-h-[30vh] mt-5 flex-col -black-600 px-4'>
  <div className=' -blue-700 md:w-[80%]  lg:flex flex-col justify-center items-center -pink-600  mx-auto p-4 md:p-8'>
    {/* Header */}
    <div className=' text-start text-xl md:text-3xl font-bold -black p-2'>
      Where do you want a ride to?
    </div>

    {/* Ride Options */}
    <div className=' mt-5 rounded-md  flex flex-col md:flex-row items-center justify-start gap-5 '>
      <div className=' -black bg-background  w-full md:w-[250px]  flex items-center justify-between px-5 py-3 rounded-md shadow-sm'>
        <span>Peshawar</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <div className=' -black w-full md:w-[250px] bg-background  flex items-center justify-between px-5 py-3 rounded-md shadow-sm'>
        <span>Peshawar</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <div className=' -black w-full md:w-[250px] flex items-center bg-background justify-between px-5 py-3 rounded-md shadow-sm'>
        <span>Peshawar</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  </div>
</section>
  )
}
