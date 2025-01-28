import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { faArrowRight, faBoxes, faCab, faClock, faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RadioGroup } from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import TimePicker from 'react-time-picker';

const PublishRideForm = () => {
  const [time, setTime] = useState("10:00"); // Default time
  const [selectedDate,setSelectedDate] = useState(new Date())
  const [step, setStep] = useState(1);
  const [rideType, setRideType] = useState("passenger"); // Ride type (passenger, cargo, mixed)
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [seats, setSeats] = useState(1);
  const [cargoCapacity, setCargoCapacity] = useState(1);
  const [pricePerSeat, setPricePerSeat] = useState("");
  const [pricePerCubicMeter, setPricePerCubicMeter] = useState("");
  const [pricePerCargo, setPricePerCargo] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isCargoRide, setiscargoRide] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

  const routes = [
    { id: 1, from: "City A", to: "City B", duration: "1h 30m", distance: "100 km" },
    { id: 2, from: "City A", to: "City C", duration: "2h", distance: "150 km" },
    { id: 3, from: "City A", to: "City D", duration: "3h", distance: "200 km" },
  ];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

  return (
    <div className="flex min-h-screen   flex-col items-center justify-center">
      <div className='h-28'></div>
      {step === 1 && (
        <div className="step md:min-w-[40%]    flex-1 flex flex-col  justify-start ">
          <h2 className='text-3xl  w-full  justify-center flex items-center font-semibold'>Where would you like to go?</h2>
          <div className="relative flex items-center w-[100%]  mt-8">
            {/* Input Field */}
            <input
              className="h-12 bg-gray-100 rounded-l-xl rounded-r-none w-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              placeholder="Enter your origin"
            />

            {/* Submit Button */}
            <Button onClick={nextStep} className="h-12 bg-secondary text-white rounded-r-xl rounded-l-none px-8 hover:bg-blue-600 transition">
              Submit
            </Button>
          </div>

          {/* Suggestions based on input */}
          <div className="suggestions my-2" onClick={nextStep}>
            <div className=' gap-6 px-5 rounded-xl hover:bg-gray-300 py-2  w-[90%] flex items-center justify-around  mx-auto'>
              <div><FontAwesomeIcon icon={faClock} /></div>
              <div className='flex-1'> <div>Berlin Brandenburg Airport</div><div>Melli-beese-Ring I, Schonelled</div></div>
              <div><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
          </div>
          <hr className='border-gray-300 w-[85%] mx-auto' />
          <div className="suggestions my-2" onClick={nextStep}>
            <div className=' gap-6 px-5 rounded-xl hover:bg-gray-300 py-2  w-[90%] flex items-center justify-around  mx-auto'>
              <div><FontAwesomeIcon icon={faClock} /></div>
              <div className='flex-1'> <div>Berlin Brandenburg Airport</div><div>Melli-beese-Ring I, Schonelled</div></div>
              <div><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
          </div>
          <hr className='border-gray-300 w-[85%] mx-auto' />
          <div className="suggestions my-2" onClick={nextStep}>
            <div className=' gap-6 px-5 rounded-xl hover:bg-gray-300 py-2  w-[90%] flex items-center justify-around  mx-auto'>
              <div><FontAwesomeIcon icon={faClock} /></div>
              <div className='flex-1'> <div>Berlin Brandenburg Airport</div><div>Melli-beese-Ring I, Schonelled</div></div>
              <div><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
          </div>
          <hr className='border-gray-300 w-[85%] mx-auto' />
          <div className="suggestions my-2" onClick={nextStep}>
            <div className=' gap-6 px-5 rounded-xl hover:bg-gray-300 py-2  w-[90%] flex items-center justify-around  mx-auto'>
              <div><FontAwesomeIcon icon={faClock} /></div>
              <div className='flex-1'> <div>Berlin Brandenburg Airport</div><div>Melli-beese-Ring I, Schonelled</div></div>
              <div><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
          </div>
          <hr className='border-gray-300 w-[85%] mx-auto' />
          <div className="suggestions my-2" onClick={nextStep}>
            <div className=' gap-6 px-5 rounded-xl hover:bg-gray-300 py-2  w-[90%] flex items-center justify-around  mx-auto'>
              <div><FontAwesomeIcon icon={faClock} /></div>
              <div className='flex-1'> <div>Berlin Brandenburg Airport</div><div>Melli-beese-Ring I, Schonelled</div></div>
              <div><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
          </div>
          <hr className='border-gray-300 w-[85%] mx-auto' />

        </div>
      )}

      {step === 2 && (
        <div className="step md:min-w-[40%]    flex-1 flex flex-col  justify-start ">
          <h2 className='text-3xl  w-full  justify-center flex items-center font-semibold'>Where are you Leaving from?</h2>
          <div className="relative flex items-center w-[100%]  mt-8">
            {/* Input Field */}
            <input
              className="h-12 bg-gray-100 rounded-l-xl rounded-r-none w-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              placeholder="Enter your origin"
            />

            {/* Submit Button */}
            <Button onClick={nextStep} className="h-12 bg-secondary text-white rounded-r-xl rounded-l-none px-8 hover:bg-blue-600 transition">
              Submit
            </Button>
          </div>
          {/* Suggestions based on input */}
          <div className="suggestions my-2" onClick={nextStep}>
            <div className=' gap-6 px-5 rounded-xl hover:bg-gray-300 py-2  w-[90%] flex items-center justify-around  mx-auto'>
              <div><FontAwesomeIcon icon={faClock} /></div>
              <div className='flex-1'> <div>Berlin Brandenburg Airport</div><div>Melli-beese-Ring I, Schonelled</div></div>
              <div><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
          </div>
          <hr className='border-gray-300 w-[85%] mx-auto' />
          <div className="suggestions my-2" onClick={nextStep}>
            <div className=' gap-6 px-5 rounded-xl hover:bg-gray-300 py-2  w-[90%] flex items-center justify-around  mx-auto'>
              <div><FontAwesomeIcon icon={faClock} /></div>
              <div className='flex-1'> <div>Berlin Brandenburg Airport</div><div>Melli-beese-Ring I, Schonelled</div></div>
              <div><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
          </div>
          <hr className='border-gray-300 w-[85%] mx-auto' />
          <div className="suggestions my-2" onClick={nextStep}>
            <div className=' gap-6 px-5 rounded-xl hover:bg-gray-300 py-2  w-[90%] flex items-center justify-around  mx-auto'>
              <div><FontAwesomeIcon icon={faClock} /></div>
              <div className='flex-1'> <div>Berlin Brandenburg Airport</div><div>Melli-beese-Ring I, Schonelled</div></div>
              <div><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
          </div>
          <hr className='border-gray-300 w-[85%] mx-auto' />
          <div className="suggestions my-2" onClick={nextStep}>
            <div className=' gap-6 px-5 rounded-xl hover:bg-gray-300 py-2  w-[90%] flex items-center justify-around  mx-auto'>
              <div><FontAwesomeIcon icon={faClock} /></div>
              <div className='flex-1'> <div>Berlin Brandenburg Airport</div><div>Melli-beese-Ring I, Schonelled</div></div>
              <div><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
          </div>
          <hr className='border-gray-300 w-[85%] mx-auto' />
          <div className="suggestions my-2" onClick={nextStep}>
            <div className=' gap-6 px-5 rounded-xl hover:bg-gray-300 py-2  w-[90%] flex items-center justify-around  mx-auto'>
              <div><FontAwesomeIcon icon={faClock} /></div>
              <div className='flex-1'> <div>Berlin Brandenburg Airport</div><div>Melli-beese-Ring I, Schonelled</div></div>
              <div><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
          </div>
          <hr className='border-gray-300 w-[85%] mx-auto' />

        </div>
      )}

      {step === 3 && (
        <div className="min-h-screen w-full flex flex-col lg:flex-row items-stretch">
          {/* Left Column */}
          <div className="flex-1 p-6">
            {/* Header */}
            <h2 className="text-3xl text-center font-semibold mb-6">What is your route?</h2>

            {/* Route List */}
            <div className="space-y-3">
              {routes.map((route) => (
                <label
                  key={route.id}
                  className={`flex items-center px-3 py-2 rounded-lg cursor-pointer  hover:bg-gray-200 
            }`}
                >
                  {/* Radio Button */}
                  <input
                    type="radio"
                    name="route"
                    checked={selectedRoute === route.id}
                    onChange={() => setSelectedRoute(route.id)}
                    className="w-5 h-5 border-2 rounded-full border-primary   mr-4"
                  />

                  {/* Route Details */}
                  <div className="flex-1">
                    <p className="text-lg font-semibold">
                      {route.from} → {route.to}
                    </p>
                    <p className="text-sm text-gray-600">
                      Duration: {route.duration} | Distance: {route.distance}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {/* Next Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Next
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1  flex justify-center items-center">
            {/* Placeholder for Map */}
            <img
              className="w-full h-full object-cover"
              src="https://www.popsci.com/wp-content/uploads/2021/10/16/Google-Maps-Fuel-Efficient.jpeg?quality=85"
              alt="Map Placeholder"
            />
          </div>
        </div>
      )}
      {step === 4 && (
  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl p-4">
  <h2 className="text-4xl font-bold text-center mb-6">When are you leaving?</h2>

  {/* Two-Month Calendar Section */}
  <div className="flex justify-between gap-6">
    {/* Left Calendar - Current Month */}
    <div className="flex-1">
      <Calendar
        activeStartDate={new Date()} // Show the current month
        onChange={setSelectedDate}
        value={selectedDate}
        className="rounded-md shadow"
      />
    </div>

    {/* Right Calendar - Next Month */}
    <div className="flex-1">
      <Calendar
        activeStartDate={new Date(new Date().setMonth(new Date().getMonth() + 1))} // Show the next month
        onChange={setSelectedDate}
        value={selectedDate}
        className="rounded-md shadow"
      />
    </div>
  </div>
  <div className="mt-8 flex justify-center">
            <Button
              onClick={nextStep}
              className="w-full bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Next
            </Button>
          </div>
</div>

 
)}
      {step === 5 && (
 <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4">
 <h2 className="text-4xl font-bold text-center mb-6">When are you leaving?</h2>

 {/* Time Picker Section */}
 <div className="text-center">
   <h3 className="text-lg font-semibold mb-4">Select Start Time</h3>
   <div className="border border-gray-300 rounded-lg p-3 shadow-md">
     <TimePicker
       onChange={setTime}
       value={time}
      //  clockClassName="hidden" // Hide clock dropdown
       className="w-full text-lg "
      //  disableClock={true} // Disables the clock icon
     />
   </div>
 </div>

 <div className="mt-8 flex justify-center">
   <button
     onClick={nextStep}
     className="w-full bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition py-2"
   >
     Next
   </button>
 </div>
</div>
 
)}

      {/* Step 5: Ride Type Selection */}
      {step === 6 && (
        <div className="w-full max-w-3xl  absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg p-10">
          <h2 className="text-4xl font-bold text-center mb-8">
            What type of ride are you offering?
          </h2>

          {/* Ride Type Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Passenger Option */}
            <label
              className={`flex flex-col items-center justify-center p-6 border rounded-lg cursor-pointer hover:shadow-lg transition-all ${rideType === "passenger"
                  ? "border-secondary bg-blue-50"
                  : "border-gray-300"
                }`}
              onClick={() => setRideType("passenger")}
            >
              <FontAwesomeIcon icon={faCab} className="text-secondary text-4xl" />
              <span className="text-lg font-semibold">Passenger</span>
              <p className="text-sm text-gray-500">Offer rides to passengers.</p>
            </label>

            {/* Cargo Option */}
            <label
              className={`flex flex-col items-center justify-center p-6 border rounded-lg cursor-pointer hover:shadow-lg transition-all ${rideType === "cargo"
                  ? "border-secondary bg-blue-50"
                  : "border-gray-300"
                }`}
              onClick={() => setRideType("cargo")}
            >
              <FontAwesomeIcon icon={faBoxes} className="text-secondary text-4xl" />
              <span className="text-lg font-semibold">Cargo</span>
              <p className="text-sm text-gray-500">Transport goods and items.</p>
            </label>

            {/* Mixed Option */}
            <label
              className={`flex flex-col items-center justify-center p-6 border rounded-lg cursor-pointer hover:shadow-lg transition-all ${rideType === "mixed"
                  ? "border-secondary bg-blue-50"
                  : "border-gray-300"
                }`}
              onClick={() => setRideType("mixed")}
            >
              <FontAwesomeIcon icon={faCab} className="text-secondary text-4xl" />
              <span className="text-lg font-semibold">Mixed</span>
              <p className="text-sm text-gray-500">
                Offer both passenger and cargo rides.
              </p>
            </label>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={nextStep}
              className="w-full bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Next
            </Button>
          </div>
        </div>
      )}


      {step === 7 && (
        <div className="flex items-start w-full justify-center flex-1">
          {/* Centered Content */}
          <div className="p-10 w-full max-w-3xl  rounded-lg">
            {/* Heading */}
            <h2 className="text-5xl pb-5 font-semibold text-center mb-8">
              {rideType === "passenger" && "Passenger Details"}
              {rideType === "cargo" && "Cargo Details"}
              {rideType === "mixed" && "Passenger & Cargo Details"}
            </h2>

            {/* Passenger Section */}
            {(rideType === "passenger" || rideType === "mixed") && (
              <div className="mb-10">
                <h3 className="text-lg font-semibold mb-4">How many passengers can you take?</h3>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setSeats((prev) => Math.max(1, prev - 1))}
                    className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
                  >
                    <div className="absolute -top-2 right-4">-</div>
                  </button>
                  <span
                    className="w-7/12 h-12 text-center bg-background text-5xl font-medium rounded-none  focus:outline-none"
                  >{seats} </span>
                  <button
                    onClick={() => setSeats((prev) => prev + 1)}
                    className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-5xl font-extrabold transition"
                  >
                    <div className="absolute -top-0 right-3">+</div>
                  </button>
                </div>
              </div>
            )}

            {/* Cargo Section */}
            {(rideType === "cargo" || rideType === "mixed") && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  How much cargo space is available? (in cubic meters)
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setCargoCapacity((prev) => Math.max(1, prev - 1))}
                    className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
                  >
                    <div className="absolute -top-2 right-4">-</div>
                  </button>
                  <span
                    className="w-7/12 h-12 text-center bg-background text-5xl font-medium rounded-none  focus:outline-none"
                  >{cargoCapacity} </span>
                  <button
                    onClick={() => setCargoCapacity((prev) => prev + 1)}
                    className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-5xl font-extrabold transition"
                  >
                    <div className="absolute -top-0 right-3">+</div>
                  </button>
                </div>
              </div>
            )}

            <hr className="border-4 rounded-full border-gray-200 my-9" />

            {/* Next Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={nextStep}
                className="px-9 py-3 bg-secondary text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 8 && (
        <div className="flex items-start w-full justify-center flex-1">
          {/* Centered Content */}
          <div className="p-10 w-full max-w-3xl  rounded-lg">
            {/* Heading */}
            <h2 className="text-5xl pb-5 font-semibold text-center mb-8">
              {rideType === "passenger" && "Set your price per passenger seat"}
              {rideType === "cargo" && "Set your price for cargo capacity"}
              {rideType === "mixed" && "Set your prices for passengers and cargo"}
            </h2>

            {/* Passenger Price Section */}
            {(rideType === "passenger" || rideType === "mixed") && (
              <div className="mb-10">
                <h3 className="text-lg font-semibold mb-4">Price per passenger seat</h3>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setPricePerSeat((prev) => Math.max(1, prev - 1))}
                    className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
                  >
                    <div className="absolute -top-2 right-4">-</div>
                  </button>
                  <span
                    className="w-7/12 h-12 text-center bg-background text-5xl font-medium rounded-none  focus:outline-none"
                  >{pricePerSeat} </span>
                  <button
                    onClick={() => setPricePerSeat((prev) => prev + 1)}
                    className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-5xl font-extrabold transition"
                  >
                    <div className="absolute -top-0 right-3">+</div>
                  </button>
                </div>
              </div>
            )}

            {/* Cargo Price Section */}
            {(rideType === "cargo" || rideType === "mixed") && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Price per cubic meter of cargo</h3>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setPricePerCargo((prev) => Math.max(1, prev - 1))}
                    className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
                  >
                    <div className="absolute -top-2 right-4">-</div>
                  </button>
                  <span
                    className="w-7/12 h-12 text-center bg-background text-5xl font-medium rounded-none  focus:outline-none"
                  >{pricePerCargo || 0} </span>
                  <button
                    onClick={() => setPricePerCargo((prev) => prev + 1)}
                    className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-5xl font-extrabold transition"
                  >
                    <div className="absolute -top-0 right-3">+</div>
                  </button>
                </div>
              </div>
            )}

            <hr className="border border-gray-200 my-5" />

            {/* Publish Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={nextStep}
                className="px-9 py-3 bg-secondary text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition"
              >
                Publish Ride
              </button>
            </div>
          </div>
        </div>
      )}

{step === 9 && (
  <div className="flex mx-auto w-[90%] md:w-1/3 items-start justify-center min-h-screen">
    <div className="w-full">
      <h2 className="text-3xl text-center font-semibold mb-7">Confirm Ride</h2>

      {/* Ride Information */}
      <div className="relative flex gap-3 my-4">
        {/* Timeline Container */}
        <div className="relative left-20 top-3 flex flex-col items-center">
          <div className="absolute top-3 w-[2px] h-16 bg-gray-800"></div>
          <div className="w-3 h-3 border-2 border-gray-800 rounded-full bg-white z-10"></div>
          <div className="w-3 h-3 border-2 border-gray-800 rounded-full bg-white z-10 mt-[58px]"></div>
        </div>

        {/* Time and Duration */}
        <p className="text-md pt-2 font-medium leading-relaxed">
          05:30
          <span className="block text-sm font-medium py-12 border-black h-2 w-12 overflow-hidden text-gray-700 mt-1">
            1h 40m
          </span>
        </p>

        {/* Location and Address */}
        <div className="flex flex-col gap-0 w-full">
          <div className="flex items-center  justify-between px-3 rounded-lg py-2 w-full">
            <p className="text-lg border-black font-semibold leading-snug">
              Redditch
              <span className="block text-xs text-gray-500">62 Unicorn Hill, UK</span>
            </p>
            <div className="font-semibold text-base">Seats: 3</div>
          </div>
          <div className="flex items-center justify-between px-3 rounded-lg py-2 w-full">
            <p className="text-lg border-black font-semibold leading-snug">
              Redditch
              <span className="block text-xs text-gray-500">62 Unicorn Hill, UK</span>
            </p>
            <div className="font-semibold text-lg">
              Price: 14 $ <span className="text-gray-300 font-normal">-per seat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5">
       
        <div onClick={() => setEditMode("price")} className="underline text-secondary cursor-pointer">
          Edit Price
        </div>
        {(rideType === "passenger" || rideType === "mixed") && (
          <div onClick={() => setEditMode("seats")} className="underline text-secondary cursor-pointer">
            Edit Seats
          </div>
        )}
        {(rideType === "cargo" || rideType === "mixed") && (
          <div onClick={() => setEditMode("capacity")} className="underline text-secondary cursor-pointer">
            Edit Capacity
          </div>
        )}
        <Button className="w-full mt-4" onClick={() => alert("Ride Published!")}>
          Publish Ride
        </Button>
      </div>

      {/* Modal for Editing */}
      {/* Edit Ride Section */}
{editMode && (
  <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 h-[40%] flex items-center flex-col justify-center -translate-y-1/2 bg-gray-100 p-6   shadow-lg w-[90%] md:w-1/3 z-50">
    {/* Close Button */}
    <button
      className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition text-2xl font-bold"
      onClick={() => setEditMode(null)}
    >
      ×
    </button>

    <h3 className="text-2xl font-semibold mb-6 text-center">
      Edit {editMode.charAt(0).toUpperCase() + editMode.slice(1)} Details
    </h3>
    <div className="flex flex-col gap-6">
      {editMode === "price" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
            Price Per Seat
          </label>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setPricePerSeat((prev) => Math.max(1, prev - 1))}
              className="w-16 h-16 text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
            >
              -
            </button>
            <span className="w-24 h-12 text-center bg-background text-5xl font-medium rounded-md">
              {pricePerSeat || 0}
            </span>
            <button
              onClick={() => setPricePerSeat((prev) => prev + 1)}
              className="w-16 h-16 text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
            >
              +
            </button>
          </div>
        </div>
      )}
      {editMode === "seats" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
            Seats Available
          </label>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setSeats((prev) => Math.max(1, prev - 1))}
              className="w-16 h-16 text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
            >
              -
            </button>
            <span className="w-24 h-12 text-center bg-background text-5xl font-medium rounded-md">
              {seats || 0}
            </span>
            <button
              onClick={() => setSeats((prev) => prev + 1)}
              className="w-16 h-16 text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
            >
              +
            </button>
          </div>
        </div>
      )}
      {editMode === "capacity" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
            Cargo Capacity (in cubic feet)
          </label>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() =>
                setCargoCapacity((prev) => Math.max(1, prev - 1))
              }
              className="w-16 h-16 text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
            >
              -
            </button>
            <span className="w-24 h-12 text-center bg-background text-5xl font-medium rounded-md">
              {cargoCapacity || 0}
            </span>
            <button
              onClick={() => setCargoCapacity((prev) => prev + 1)}
              className="w-16 h-16 text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition mt-4"
        onClick={() => {
          setEditMode(null); // Close edit mode after saving
          // Replace alert with this log or custom success handler
          console.log("Ride details updated!");
        }}
      >
        Save Changes
      </button>
    </div>
  </div>
)}

    </div>
  </div>
)}


    </div>
  );
};

export default PublishRideForm;
