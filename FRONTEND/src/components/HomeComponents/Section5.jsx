
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
export const Section5 = () => {
  return (
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
  )
}
