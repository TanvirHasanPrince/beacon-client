import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Lottie from "lottie-react";
import Link from "next/link";
import {
  tailwindButtonClass,
  tailwindTitleClipBrackground,
} from "../tailwindClasses";

const variants = {
  hiddenLeft: { opacity: 0, x: -100 },
  hiddenRight: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

interface SectionProps {
  index: number;
  title: string;
  subtitle: string;
  description: string;
  animationData: any;
  button?: {
    text: string;
    href: string;
  };
}

const Section: React.FC<SectionProps> = ({
  index,
  title,
  subtitle,
  description,
  animationData,
  button,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={index % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
      animate={controls}
      variants={variants}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          <span className={tailwindTitleClipBrackground}>{title}</span> <br />
          <span className={tailwindTitleClipBrackground}>{subtitle}</span>
        </h1>
        <p className="text-xl text-center text-gray-600 mb-8">{description}</p>
      </div>
      <div className="flex justify-center mb-8">
        <Lottie animationData={animationData} loop={true} />
      </div>
      {button && (
        <div className="flex justify-center">
          <Link href={button.href}>
            <button
              className={`${tailwindButtonClass} font-normal`}
              style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
            >
              {button.text}
            </button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default Section;
