"use client";
import React from "react";
import Lottie from "lottie-react";
import connect from "../../assets/HomePage/connect.json";
import Link from "next/link";
import { Button } from "antd";

const HomePage = () => {
  const loginButtonStyle = {
    padding: "12px 30px",
    color: "white",
    backgroundColor: "#FF5252", // Red color
    border: "none",
    borderRadius: "6px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Box shadow for depth
    transition: "background-color 0.3s ease", // Smooth transition
  };

  return (
    <div>
      <section className={`text-center`}>
        <p className="text-center">
          Connecting Hearts, Healing Minds <br />
          <span className="text-red-600 font-bold">
            Join us on a journey of healing and companionship.
          </span>
        </p>
        <Lottie animationData={connect} loop={true} />
        <p className="mb-8">
          <span className="text-blue-600 font-bold">
            Join us on a journey of healing and companionship.
          </span>
        </p>
        <Link href={"/login"} style={loginButtonStyle}>
          <button>Login</button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
