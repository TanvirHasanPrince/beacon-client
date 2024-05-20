"use client";
import React from "react";
import Lottie from "lottie-react";
import connect from "../../assets/HomePage/A_group_of_diverse_friends_standing_on_a_cliff.jpg";
import Link from "next/link";
import Image from "next/image";

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
        <Image src={connect} width={500} height={500} alt="homepage" />

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
