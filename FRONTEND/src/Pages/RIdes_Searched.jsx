import { useState } from 'react';
import RideCard from '@/components/ride/RideCard';
import RideFilters from '@/components/filters/RideFilters';
import mockRides from '@/constants/mockrides.js';


export default function RidesSearched() {
  const [rides] = useState(mockRides);

  return (
    <div className="container py-8">
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] overflow-auto">
          <RideFilters />
        </aside>
        
        <main className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Available Rides</h2>
            <span className="text-muted-foreground">{rides.length} rides found</span>
          </div>
          
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </main>
      </div>
    </div>
  );
}