
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



export const Section6 = () => {
  return (
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
  )
}
