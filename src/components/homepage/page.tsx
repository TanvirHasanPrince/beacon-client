"use client";
import React from "react";
import Lottie from "lottie-react";
import yoga from "../../assets/HomePage/HomePage.json";
import connect from "../../assets/HomePage/connect.json";

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
      </section>

      <section className="text-center h-screen">
        <p className="uppercase">Mental Health Wellness</p>
        <Lottie animationData={yoga} loop={true} />
      </section>

      <section className="text-center h-screen">
        <p className="uppercase">Mental Health Wellness</p>
        <Lottie animationData={yoga} loop={true} />
      </section>

      <section className="text-center h-screen">
        <p className="uppercase">Mental Health Wellness</p>
        <Lottie animationData={yoga} loop={true} />
      </section>
    </div>
  );
};

export default HomePage;
