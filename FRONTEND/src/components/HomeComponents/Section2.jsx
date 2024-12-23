import {  faDollar, faIdCard,  faThunderstorm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Section2 = () => {
  return (
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
  )
}

export default Section2