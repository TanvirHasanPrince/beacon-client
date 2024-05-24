"use client";
import React from "react";
import Lottie from "lottie-react";
import phoneAnimation from "../../assets/HomePage/phone_using_animation.json";
import cafeAnimation from "../../assets/HomePage/events_cafe_anim.json";
import journal from "../../assets/HomePage/journal_anim.json";
import vid_call from "../../assets/HomePage/video_call.json";
import meditation from "../../assets/HomePage/meditation.json";
import todoAnimation from "../../assets/HomePage/todoanim.json";
import Link from "next/link";
import Image from "next/image";
import {
  tailwindButtonClass,
  tailwindTitleClipBrackground,
} from "../tailwindClasses";
import Footer from "../footer/Footer";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
              <span className={`${tailwindTitleClipBrackground}`}>
                Empowering Minds
              </span>{" "}
              <br />
              <span className={`${tailwindTitleClipBrackground}`}>
                Uniting Hearts
              </span>
            </h1>
            <p className="text-xl text-center text-gray-600 mb-8">
              Your Mental Health Companion
            </p>
          </div>

          <div className="flex justify-center ">
            <Lottie animationData={phoneAnimation} loop={true} />;
          </div>
          <div className="flex justify-center">
            <Link href="/login">
              <button
                className={`${tailwindButtonClass}`}
                style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
              >
                Login
              </button>
            </Link>
          </div>
        </div>

        <div>
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
              <span className={`${tailwindTitleClipBrackground}`}>
                Create events
              </span>{" "}
              <br />
              <span className={`${tailwindTitleClipBrackground}`}>
                or join events organized by others
              </span>
            </h1>
            <p className="text-xl text-center text-gray-600 mb-8">
              Create or join events to raise awareness, share coping strategies,
              or offer support.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Lottie animationData={cafeAnimation} loop={true} />;
          </div>
        </div>

        <div>
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
              <span className={`${tailwindTitleClipBrackground}`}>
                Unlock Inner Voice
              </span>{" "}
              <br />
              <span className={`${tailwindTitleClipBrackground}`}>
                Journal Your Way to Mindful Living
              </span>
            </h1>
            <p className="text-xl text-center text-gray-600 mb-8">
              Unleash the power of the written word and use our journaling
              feature to unravel the complexities of your mind.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Lottie animationData={journal} loop={true} />;
          </div>
        </div>

        <div>
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
              <span className={`${tailwindTitleClipBrackground}`}>
                Compassionate Care
              </span>{" "}
              <br />
              <span className={`${tailwindTitleClipBrackground}`}>
                Video Consultations for Your Mental Well-being
              </span>
            </h1>
            <p className="text-xl text-center text-gray-600 mb-8">
              Our app brings professional mental health support closer to you
              through convenient video consultations.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Lottie animationData={vid_call} loop={true} />;
          </div>
        </div>

        <div>
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
              <span className={`${tailwindTitleClipBrackground}`}>
                Embrace Serenity
              </span>{" "}
              <br />
              <span className={`${tailwindTitleClipBrackground}`}>
                Your Oasis for Self-Care and Inner Peace
              </span>
            </h1>
            <p className="text-xl text-center text-gray-600 mb-8">
              Our app offers a curated collection of calming experiences,
              allowing you to find solace, recharge your energy, and cultivate a
              sense of inner peace whenever you need it.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Lottie animationData={meditation} loop={true} />;
          </div>
        </div>

        <div>
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
              <span className={`${tailwindTitleClipBrackground}`}>
                Embracing Compassion
              </span>{" "}
              <br />
              <span className={`${tailwindTitleClipBrackground}`}>
                One Challenge at a Time
              </span>
            </h1>
            <p className="text-xl text-center text-gray-600 mb-8">
              Kindness is contagious, and our app provides the spark to ignite a
              ripple effect of compassion within your community and beyond.
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <Lottie animationData={todoAnimation} loop={true} />;
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
