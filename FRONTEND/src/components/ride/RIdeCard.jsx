import { MapPin, Clock, Calendar, Users, Package, Star } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; 
import { useNavigate } from "react-router";

export default function RideCard({ ride }) {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/ride-detail/${ride.id}`, { state: { ride } }); // Pass ride details via state
  };

  return (
    <div className="bg-card hover:shadow-lg transition-shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Driver Info */}
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <img src={ride.driver.avatar} alt={ride.driver.name} />
          </Avatar>
          <div>
            <h3 className="font-semibold">{ride.driver.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{ride.driver.rating}</span>
              <span>•</span>
              <span>{ride.driver.trips} trips</span>
            </div>
          </div>
        </div>

        {/* Ride Details */}
        <div className="flex-1 space-y-4">
          {/* Route */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="font-medium">{ride.from}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="font-medium">{ride.to}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">${ride.price}</div>
              <div className="text-sm text-muted-foreground">per seat</div>
            </div>
          </div>

          {/* Info Badges */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{ride.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{ride.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{ride.seats} seats left</span>
            </div>
            <Badge variant="secondary">
              {ride.type === "cargo" ? (
                <div className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  <span>Cargo allowed</span>
                </div>
              ) : (
                "Passengers only"
              )}
            </Badge>
          </div>

          {/* Distance & Duration */}
          <div className="text-sm text-muted-foreground">
            {ride.distance} • {ride.duration}
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div className="mt-4 flex justify-end">
        <Button onClick={handleBookClick} className="w-full md:w-auto">
          Book Ride
        </Button>
      </div>
    </div>
  );
}
