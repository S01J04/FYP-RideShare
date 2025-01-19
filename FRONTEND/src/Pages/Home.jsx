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
    <div className='min-h-screen  hide-scrollbar' >
        <Section1/>
        <Section2/>
        <Section3/>
       

      {/* Features Section */}
      <section className="py-16  flex items-center justify-center bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Convenient Travel</h3>
              <p className="text-muted-foreground">
                Find rides that match your schedule and preferences.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cargo Transport</h3>
              <p className="text-muted-foreground">
                Send packages safely with verified drivers.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Safe & Secure</h3>
              <p className="text-muted-foreground">
                Verified profiles and secure payment system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16  bg-primary   flex items-center justify-center">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of happy travelers using our platform daily.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="" size="lg">
              Find a Ride
            </Button>
            <Button variant="" size="lg">
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
