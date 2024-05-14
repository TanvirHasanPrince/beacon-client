"use client";
import React from "react";
import Lottie from "lottie-react";
import yoga from "../../assets/HomePage/HomePage.json";
import connect from "../../assets/HomePage/connect.json";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <section className={`text-center h-screen`}>
        <p className="text-center">
          Connecting Hearts, Healing Minds <br />
          <span className="text-red-600 font-bold ">
            Join us on a journey of healing and companionship.
          </span>
        </p>
        <Lottie animationData={connect} loop={true} />
        <p className="mb-8">
          <span className="text-blue-600 font-bold">
            Join us on a journey of healing and companionship.
          </span>
        </p>
        <Link href={"/login"}>
          <button className="px-10 py-4 bg-red-700 text-white"> Login </button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
