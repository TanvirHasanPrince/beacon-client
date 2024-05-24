"use client";
import React from "react";

import phoneAnimation from "../../assets/HomePage/phone_using_animation.json";
import cafeAnimation from "../../assets/HomePage/events_cafe_anim.json";
import journal from "../../assets/HomePage/journal_anim.json";
import vid_call from "../../assets/HomePage/video_call.json";
import meditation from "../../assets/HomePage/meditation.json";
import todoAnimation from "../../assets/HomePage/todoanim.json";
import Footer from "../footer/Footer";
import Section from "../ui/Section";

const HomePage = () => {
  const sections = [
    {
      title: "Empowering Minds",
      subtitle: "Uniting Hearts",
      description: "Your Mental Health Companion",
      animationData: phoneAnimation,
      button: {
        text: "Login",
        href: "/login",
      },
    },
    {
      title: "Create events",
      subtitle: "or join events organized by others",
      description:
        "Create or join events to raise awareness, share coping strategies, or offer support.",
      animationData: cafeAnimation,
    },
    {
      title: "Unlock Inner Voice",
      subtitle: "Journal Your Way to Mindful Living",
      description:
        "Unleash the power of the written word and use our journaling feature to unravel the complexities of your mind.",
      animationData: journal,
    },
    {
      title: "Compassionate Care",
      subtitle: "Video Consultations for Your Mental Well-being",
      description:
        "Our app brings professional mental health support closer to you through convenient video consultations.",
      animationData: vid_call,
    },
    {
      title: "Embrace Serenity",
      subtitle: "Your Oasis for Self-Care and Inner Peace",
      description:
        "Our app offers a curated collection of calming experiences, allowing you to find solace, recharge your energy, and cultivate a sense of inner peace whenever you need it.",
      animationData: meditation,
    },
    {
      title: "Embracing Compassion",
      subtitle: "One Challenge at a Time",
      description:
        "Kindness is contagious, and our app provides the spark to ignite a ripple effect of compassion within your community and beyond.",
      animationData: todoAnimation,
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {sections.map((section, index) => (
          <Section
            key={index}
            index={index}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            animationData={section.animationData}
            button={section.button}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
