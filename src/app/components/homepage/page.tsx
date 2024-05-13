"use client";
import React from "react";
import Lottie from "lottie-react";
import health from "../../assets/HomePage.json";

const HomePage = () => {
  return (
    <div>
      <section className="text-center">
        <h1 className="text-center">Beacon</h1>
        <p className="uppercase">Mental Health Wellness</p>
        <Lottie animationData={health} loop={true} />
      </section>

      <section className="text-center">
        <h1 className="text-center">Beacon</h1>
        <p className="uppercase">Mental Health Wellness</p>
        <Lottie animationData={health} loop={true} />
      </section>

      <section className="text-center">
        <h1 className="text-center">Beacon</h1>
        <p className="uppercase">Mental Health Wellness</p>
        <Lottie animationData={health} loop={true} />
      </section>

      <section className="text-center">
        <h1 className="text-center">Beacon</h1>
        <p className="uppercase">Mental Health Wellness</p>
        <Lottie animationData={health} loop={true} />
      </section>
    </div>
  );
};

export default HomePage;
