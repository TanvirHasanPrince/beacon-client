/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import the_little_seed from "../../../../../assets/self-care/stories/the_seed/seed1.jpg";
import mcp1 from "../../../../../assets/self-care/stories/mcplp/mcp1.jpg";
import stph1 from "../../../../../assets/self-care/stories/stph1.jpg";
import bldclmb1 from "../../../../../assets/self-care/stories/bldclb1.jpg";
import btrfly from "../../../../../assets/self-care/stories/btrfly.jpg";
import trainengine from "../../../../../assets/self-care/stories/trnengn.jpg";
const StoriesPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-2xl text-black font-bold">
        <h1>Self-care</h1>
        <p>Stories that keep you going</p>
        <div className="grid grid-cols-2 gap-5 mt-8 px-4">
          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/stories/1"}>
              <Image
                src={the_little_seed}
                width={500}
                height={500}
                alt="Meditating girl"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  The Little Seed
                </p>
              </div>
            </Link>
          </div>
          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/stories/2"}>
              <Image
                src={mcp1}
                width={500}
                height={500}
                alt="Meditating girl"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Michael Phelps' Story of Mental Health
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/stories/2"}>
              <Image
                src={stph1}
                width={500}
                height={500}
                alt="Meditating girl"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Stephen Hawking
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/stories/2"}>
              <Image
                src={bldclmb1}
                width={500}
                height={500}
                alt="The Blind Climber"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  The Blind Climber
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/stories/2"}>
              <Image
                src={btrfly}
                width={500}
                height={500}
                alt="The Overlooked Butterfly"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  The Overlooked Butterfly
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/stories/2"}>
              <Image
                src={trainengine}
                width={500}
                height={500}
                alt="The Little Engine That Could"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  The Little Engine That Could
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
