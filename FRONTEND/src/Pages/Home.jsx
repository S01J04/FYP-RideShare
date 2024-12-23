import React, { useEffect, useState } from 'react'
import { Section1 } from '@/components/HomeComponents/Section1'
import Section2 from '@/components/HomeComponents/Section2'
import Section3 from '@/components/HomeComponents/Section3'
import Section4 from '@/components/HomeComponents/Section4'
import { Section5 } from '@/components/HomeComponents/Section5'
import { Section6 } from '@/components/HomeComponents/Section6'
import '../index.css'
export const Home = () => {
  // Set the default date to today's date in the format yyyy-mm-dd
  
  return (
    <div className='min-h-screen border border-green-700 hide-scrollbar' >
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/>
        <Section5/>
        <Section6/>

      



      




    </div>
  )
}
