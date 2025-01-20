import { faArrowLeft, faBus, faIdCard, faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router";

const PaymentPage = () => {
    const navigate=useNavigate()
  return (
    <div className="min-h-screen relative bg-background flex justify-center py-32">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Passenger Details Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Passenger Details */}
          <section className="p-6 bg-card shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Passenger details</h2>
            <div className="space-y-4">
              <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name*"
                  className="dark:border-none border border-gray-300 dark:bg-primary p-3 rounded-md w-full"
                />
                <input
                  type="text"
                  placeholder="Last name*"
                  className="dark:border-none border border-gray-300 dark:bg-primary  p-3 rounded-md w-full"
                />
                <div>
                  <select className=" p-3 dark:border-none border border-gray-300 dark:bg-primary rounded-md w-full  dark:text-gray-400">
                    <option >Adult (16 - 99 years)</option>
                    <option>Child (0 - 15 years)</option>
                  </select>
                </div>
              </div>

              <button className="text-blue-600 text-sm font-semibold">
                + Add one more passenger
              </button>
            </div>
          </section>

          {/* Contact Section */}
          <section className="p-6 bg-card shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <p className="text-gray-600 text-sm mb-3">
              We will send your tickets to this email
            </p>
            <input
              type="email"
              placeholder="Email*"
              className="dark:border-none border border-gray-300 dark:bg-primary  p-3 rounded-md w-1/2"
            />
          </section>

          {/* Payment Method */}
          <section className="p-6 bg-card shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Payment method</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input type="radio" name="payment" className="w-5 h-5 " />
                <label className="text-sm">Credit/Debit Card</label>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="dark:border-none border border-gray-300 dark:bg-primary  p-3 rounded-md w-full mb-3"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  className="dark:border-none border border-gray-300 p-3 dark:bg-primary  rounded-md w-full mb-3"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY)"
                    className="dark:border-none border border-gray-300 dark:bg-primary  p-3 rounded-md w-full"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="  p-3 dark:border-none border border-gray-300 rounded-md dark:bg-primary  w-full"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Booking Details Section */}
        <aside className="p-6 bg-card shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-6">Booking details</h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-5 justify-between">
              <div>
                <p className="text-sm font-semibold">Thu, 05 Dec</p>
                <p className="text-sm text-gray-600">
                  00:33 <FontAwesomeIcon icon={faBus} color="grey" /> Manchester
                  Miles Platting
                </p>
                <p className="text-sm text-gray-600">
                  01:20 <FontAwesomeIcon icon={faBus} color="grey" /> Manchester
                  Airport Bus Station
                </p>
              </div>
              <div className="text-sm text-blue-600">Amendable</div>
            </div>
            <div>
              <p className="text-blue-600 text-sm font-semibold">
                <FontAwesomeIcon icon={faMap} /> See your Trip details
              </p>
            </div>
            <hr className="border border-gray-200" />
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Booking fee</p>
              <p className="text-sm">£1.50</p>
            </div>
          
            <div>
              <input
                type="checkbox"
                className="mr-2 border border-gray-400 text-red-600 size-3"
              />
              <label className="text-sm text-gray-600">
                I acknowledge and accept the National Express{" "}
                <a href="#" className="text-blue-600">
                  Terms and conditions
                </a>{" "}
                and any special conditions applicable to my reservation.
              </label>
            </div>
            <hr className="border border-gray-200" />
            <div className="flex justify-between items-center font-semibold text-lg">
              <p>Total</p>
              <p>£6.60</p>
            </div>
            <button className="bg-secondary dark:text-black  text-white hover:bg-primary hover:dark:text-white hover:text-black w-full py-3 rounded-lg mt-4 flex justify-center items-center  gap-2">
              <FontAwesomeIcon icon={faIdCard} />
              <span>Pay with Card</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PaymentPage;
