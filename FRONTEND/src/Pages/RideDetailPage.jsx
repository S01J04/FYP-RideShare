import { Button } from "@/components/ui/button";
import { faArrowLeft, faArrowRight, faCab, faCircleInfo, faIcicles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export const RideDetailPage = () => {
   useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when component mounts
    }, []);
  const navigate = useNavigate()
  return (
    <div className="min-h-screen lg:w-2/3 mx-auto p-6">
     

      <div className="h-20"></div>
      {/* Page Header */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
        Monday, 20 January
      </h1>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ride Information Section */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-card px-6 pb-6 shadow-md rounded-2xl p-4">
          <div className="flex gap-5 flex-col justify-center items-start">
                <div className="relative flex gap-7 items-start">
                  {/* Vertical Line */}
                  <div className="absolute left-[32%] h-16 -bottom-10 w-1 bg-gray-800"></div>

                  {/* Top Circle */}
                  <div className="absolute w-3 h-3 bg-gray-800 rounded-full left-[30%] top-3"></div>

                  {/* Bottom Circle */}
                  <div className="absolute w-3 h-3 bg-gray-800 rounded-full left-[30%] -bottom-10"></div>

                  <p className="text-md font-medium">
                    05:30
                    <p className="text-sm font-medium text-gray-700">1h40</p>
                  </p>
                  <p className="text-lg font-semibold">
                    Redditch
                    <p className="text-xs text-gray-500">62 Unicorn Hill, UK</p>
                  </p>
                </div>

                <div className="flex gap-7 items-start">
                  <p className="text-md font-medium">05:30</p>
                  <p className="text-lg font-semibold">
                    Redditch
                    <p className="text-sm text-gray-800">
                      Northolt Underground Station, London, Mandeville Rd, UK
                    </p>
                  </p>
                </div>
              </div>
          </div>

          {/* Driver Details */}
          <div className="bg-card flex flex-col gap-3 shadow-md rounded-lg p-6 space-y-4">
            <Link to={'/rider-profile/Muhammad-Sohaib'}>
              <div className="flex items-center space-x-4 hover:bg-primary py-2 px-2 rounded-xl">
                <img
                  src="https://randomuser.me/api/portraits/women/1.jpg"
                  alt="Driver"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-lg font-semibold">Faisal</p>
                  <p className="text-sm text-gray-600">⭐ 5/5 - 1 rating</p>
                </div>
              </div></Link>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">✔</span>
                <p className="text-sm text-gray-700">Verified Profile</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✔</span>
                <p className="text-sm text-gray-700">Never cancels rides</p>
              </div>
              <p className="text-md text-gray-400 font-semibold">
                I am very flexible in dropping off passengers. I do weekend
                travel from London to Redditch and from Redditch to London,
                starting at 5:45 am. I can pick anyone up from places on the M40
                motorway like Banbury or Royal Leamington Spa, Warwick.
              </p>
              <hr className="border-gray-300" />
              <div className="flex items-center py-4 space-x-2">
                <span className="text-orange-500">⚡</span>
                <p className="text-md text-gray-500 font-semibold">
                  Your booking will be confirmed instantly
                </p>
              </div>
              <div className="flex items-center py-4 space-x-2">
                <span className="text-gray-700">👤</span>
                <p className="text-md text-gray-500 font-semibold">
                  Max. 2 in the back
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">🚗</span>
                <p className="text-md text-gray-500 font-semibold">
                  BMW 5 SERIES - Blue
                </p>
              </div>
              <div>
                <Link to={'/chat'}><Button className="bg-transparent border rounded-3xl">Contact</Button></Link>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="space-y-4">
          <div className="sticky top-6">
            <div className="bg-card shadow-md rounded-lg p-4  mb-4">
              <span className="text-sm text-gray-500"><FontAwesomeIcon size="xl" icon={faCircleInfo} /> This ride has Already departured</span>
            </div>
            <div className="bg-card shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold">Monday, 20 January</h2>
              <div className="flex gap-5 flex-col justify-center items-start">
                <div className="relative flex gap-7 items-start">
                  {/* Vertical Line */}
                  <div className="absolute left-[32%] h-16 -bottom-10 w-1 bg-gray-800"></div>

                  {/* Top Circle */}
                  <div className="absolute w-3 h-3 bg-gray-800 rounded-full left-[30%] top-3"></div>

                  {/* Bottom Circle */}
                  <div className="absolute w-3 h-3 bg-gray-800 rounded-full left-[30%] -bottom-10"></div>

                  <p className="text-md font-medium">
                    05:30
                    <p className="text-sm font-medium text-gray-700">1h40</p>
                  </p>
                  <p className="text-lg font-semibold">
                    Redditch
                    <p className="text-xs text-gray-500">62 Unicorn Hill, UK</p>
                  </p>
                </div>

                <div className="flex gap-7 items-start">
                  <p className="text-md font-medium">05:30</p>
                  <p className="text-lg font-semibold">
                    Redditch
                    <p className="text-sm text-gray-800">
                      Northolt Underground Station, London, Mandeville Rd, UK
                    </p>
                  </p>
                </div>
              </div>
              <hr className="border-primary my-3" />
              <div className="flex items-center mt-4">
                <FontAwesomeIcon size="xl" color="gray" icon={faCab} className="mx-3" />
                <img
                  src="https://randomuser.me/api/portraits/women/1.jpg"
                  alt="Driver"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <p className="text-sm font-semibold">Faisal <p className="text-sm text-gray-600">⭐ 5/5 </p></p>

              </div>
            </div>

            <div className="bg-card shadow-md rounded-lg p-4 mt-4">
              <div className="flex justify-between items-center">
                <p className="text-sm">1 Passenger</p>
                <p className="text-lg font-semibold">£12.79</p>
              </div>
              <Link to={'/ride-booking/:rideId'}><Button className="mt-4 w-full bg-secondary text-white  hover:bg-primary hover:text-black">
                Request a booking
              </Button></Link>
            </div>
            <div className="bg-card flex flex-col gap-4 shadow-md rounded-lg p-4 mt-4">
              <h3>Passangers</h3>
              <div className="flex justify-between items-center">
                <p className="text-sm flex items-center gap-3"><img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/women/1.jpg" alt="" /> Zaryab</p>
                <p className="text-lg font-semibold"><FontAwesomeIcon icon={faArrowRight}/></p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm flex items-center gap-3"><img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/women/1.jpg" alt="" /> Zaryab</p>
                <p className="text-lg font-semibold"><FontAwesomeIcon icon={faArrowRight}/></p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
