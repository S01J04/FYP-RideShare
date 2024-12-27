import { useLocation, useNavigate } from "react-router-dom";
import { Shield, Star, Clock, Calendar, MapPin, Users, Package, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function RideDetailPage() {
  const navigate=useNavigate()
  const { state } = useLocation(); // Access the ride details passed via navigate
  const ride = state?.ride; // Ensure the ride data is available

  if (!ride) {
    return <div className="container py-8">Ride details not available.</div>;
  }
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
        <main>
          <div className="bg-card rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="h-16 w-16">
                <img src={ride.driver.avatar} alt={ride.driver.name} />
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{ride.driver.name}</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{ride.driver.rating}</span>
                  <span>•</span>
                  <span>{ride.driver.trips} trips</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{ride.from}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{ride.to}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>{ride.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{ride.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>{ride.seats} seats</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                <span>{ride.type === "mixed" ? "Cargo allowed" : "Passengers only"}</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Driver Preferences</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Badge variant={ride.preferences.smoking ? "default" : "secondary"}>
                No Smoking
              </Badge>
              <Badge variant={ride.preferences.pets ? "default" : "secondary"}>
                Pets Allowed
              </Badge>
              <Badge variant={ride.preferences.music ? "default" : "secondary"}>
                Music
              </Badge>
            </div>
          </div>
        </main>

        <aside className="lg:sticky lg:top-20 space-y-4">
          <div className="bg-card rounded-lg p-6">
            <div className="text-3xl font-bold mb-6">${ride.price}</div>
            <Button className="w-full mb-4">Book Now</Button>
            <Button onClick={(e) => {
                e.preventDefault();
                navigate("/chat", { state: { ride } });
            }} variant="outline" className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Driver
            </Button>
          </div>

          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Safety Features</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Verified driver</li>
              <li>Secure payments</li>
              <li>24/7 support</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
