"use client";
import React from "react";
import Lottie from "lottie-react";
import yoga from "../../assets/HomePage/HomePage.json";
import connect from "../../assets/HomePage/connect.json";
import { Nunito } from "next/font/google";
const nunito = Nunito({
  weight: "600",
  subsets: ["latin"],
});

const HomePage = () => {
  return (
    <div>
      <section className={`${nunito.className} text-center h-screen`}>
        <p className="">
          Connecting Hearts, Healing Minds <br />
          <span className="text-red-600">
            Your Path to Genuine Connections and Support
          </span>
        </p>
        <Lottie animationData={connect} loop={true} />
        <p className="">
          <span className="text-blue-600">
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
