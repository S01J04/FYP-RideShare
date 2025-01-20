import { faFileText, faMessage, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router";

const RiderProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6   rounded-lg">
        <div className="h-20"></div>
      {/* Header */}
      <div className="flex items-center gap-6">
        <img
          src="https://randomuser.me/api/portraits/men/2.jpg " // Replace with actual profile picture
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-semibold">Faisal</h1>
          <p className="text-gray-600">41 y/o</p>
        </div>
      </div>

      {/* Experience and Rating */}
      <div className="mt-4 ">
        <p className="text-gray-500">Experience level: Newcomer</p>
        <Link to={'/rider-rating/sohaib'}><p className="flex items-center gap-2  hover:bg-blue-100 rounded-lg px-3 py-2 text-gray-700">
          <span className="text-lg font-bold"><FontAwesomeIcon size="sm" color="gray" icon={faStar}/> 5/5</span> — 1 rating
        </p></Link>
      </div>
      <hr className="border-gray-300 my-3"/>

      {/* Verified Profile Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Faisal has a Verified Profile
        </h2>
        <ul className="mt-3 space-y-4">
          <li className="flex items-center gap-2">
            <span className="text-blue-500">✔</span>
            Verified ID
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500">✔</span>
            Confirmed email
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500">✔</span>
            Confirmed phone number
          </li>
        </ul>
      </div>
      <hr className=" border-4 border-gray-200 rounded-full my-4 " />

      {/* About Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">About Faisal</h2>
        <p className="mt-4 text-gray-700">
          <FontAwesomeIcon icon={faMessage} color="grey"/> I’m chatty when I feel comfortable
        </p>
        <hr  className="border border-gray-200 my-5"/>
        <p className="mt-4 text-gray-700">
          Faisal is a non-professional member
        </p>
        <hr  className="border border-gray-200 my-5"/>
        <div className="mt-4 text-gray-500">
          <p>61 rides published</p>
          <p>Member since November 2019</p>
        </div>
        <hr  className="border border-gray-200 my-5"/>
      </div>

      {/* Footer */}
      <div className="mt-6  pt-4">
        <a
          href="#"
          className="text-sm text-blue-600 hover:underline"
        >
          Report this member
        </a>
      </div>
    </div>
  );
};

export default RiderProfilePage;
