'use client'
import React from 'react'
import Lottie from "lottie-react";
import BeaconLoginAnimation from "../../assets/Login Page/beacon-login.json";

const BeaconLogin = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
   
  };

  const animationContainerStyle = {
    maxWidth: "400px",
    width: "100%",
  };
  return (
    <div style={containerStyle}>
      <Lottie
        animationData={BeaconLoginAnimation}
        loop={true}
        style={animationContainerStyle}
      />
    </div>
  );
}

export default BeaconLogin