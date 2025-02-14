import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router";

const RatingsPage = () => {
   useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when component mounts
    }, []);
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-center text-teal-900 mb-8">
          Ratings
        </h1>

        {/* Rating Summary Section */}
        <div className="  p-6">
          <div className="flex flex-col gap-5 items-start ">
            {/* Overall Rating */}
            <div className="">
              <p className="text-5xl font-bold text-teal-900">5/5</p>
              <p className="text-sm text-gray-500">1 rating</p>
            </div>

           
          <hr  className="border w-full border-gray-200"/>
            {/* Rating Breakdown */}
            <div className="w-full flex flex-col gap-5 text-gray-500">
              <div className="flex justify-between text-sm">
                <p>Excellent</p>
                <p>1</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Good</p>
                <p>0</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Okay</p>
                <p>0</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Disappointing</p>
                <p>0</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Very Disappointing</p>
                <p>0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Individual Rating Section */}
        <div className="   p-6 space-y-4">
          {/* Reviewer Info */}
          <Link to={'/rider-profile/Muhammad-Sohaib'}><div className="flex hover:bg-primary rounded-lg py-2 px-2 justify-between items-center space-x-4">
            <div className="flex  items-center gap-3"><img
              src="https://randomuser.me/api/portraits/men/3.jpg"
              alt="Reviewer"
              className="w-12 h-12 rounded-full border"
            />
            <p className="text-teal-900 font-semibold">Japnamjot</p></div>
            <div> <FontAwesomeIcon icon={faArrowRight}/></div>
          </div></Link>

          {/* Rating Text */}
          <div>
            <p className="font-semibold text-teal-900">Excellent</p>
            <p className="text-sm text-gray-700 mt-2">
              My ride was very good. The driver was very cooperative and
              friendly, and the car is very clean and in excellent condition.
            </p>
          </div>

          {/* Date */}
          <p className="text-xs text-gray-500">Jun 2024</p>
        </div>
        <hr  className="border w-full border-gray-200"/>
      </div>
    </div>
  );
};

export default RatingsPage;
