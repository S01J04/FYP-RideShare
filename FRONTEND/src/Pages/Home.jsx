import React, { useEffect, useState } from 'react'
import { Section1 } from '@/components/HomeComponents/Section1'
import Section2 from '@/components/HomeComponents/Section2'
import Section3 from '@/components/HomeComponents/Section3'
import Section4 from '@/components/HomeComponents/Section4'
import { Section5 } from '@/components/HomeComponents/Section5'
import { Section6 } from '@/components/HomeComponents/Section6'
import '../index.css'
import { Car, Package, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Home = () => {
  // Set the default date to today's date in the format yyyy-mm-dd
  
  return (
    <div className='min-h-screen   font-sans   hide-scrollbar' >
        <Section1/>
        <Section2/>
        <Section3/>
       

      {/* Features Section */}
      <section className="py-16 text-subtext  flex items-center justify-center bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-heading text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Car size={54} className=" text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-heading">Convenient Travel</h3>
              <p className="">
                Find rides that match your schedule and preferences.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-24 h-24 mx-auto mb-4  rounded-full flex items-center justify-center">
                <Package size={54} className=" text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-heading mb-3">Cargo Transport</h3>
              <p className="">
                Send packages safely with verified drivers.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield size={54} className=" text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-heading">Safe & Secure</h3>
              <p className="">
                Verified profiles and secure payment system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16  bg-primary   flex items-center justify-center">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90 text-white">
            Join thousands of happy travelers using our platform daily.
          </p>
          <div className="flex justify-center gap-4">
            <Button className='bg-white text-heading font-bold'  variant="" size="lg">
              Find a Ride
            </Button>
            <Button  className='bg-white text-heading font-bold'   variant="" size="lg">
              Offer a Ride
            </Button>
          </div>
        </div>
      </section>
        <Section4/>
        <Section5/>
        <Section6/>
    </div>
  )
}
