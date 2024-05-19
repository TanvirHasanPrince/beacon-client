import Image from "next/image";
import Link from "next/link";
import React from "react";
import meditating_girl from "../../../../../assets/self-care/meditation/meditating_girl.jpg";

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
                src={meditating_girl}
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
            <Link href={"/member/selfCare/stories"}>
              <Image
                src={meditating_girl}
                width={500}
                height={500}
                alt="Meditating girl"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">Meditation</p>
              </div>
            </Link>
          </div>
          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/stories"}>
              <Image
                src={meditating_girl}
                width={500}
                height={500}
                alt="Meditating girl"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">Meditation</p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/stories"}>
              <Image
                src={meditating_girl}
                width={500}
                height={500}
                alt="Meditating girl"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">Meditation</p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/stories"}>
              <Image
                src={meditating_girl}
                width={500}
                height={500}
                alt="Meditating girl"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">Meditation</p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/stories"}>
              <Image
                src={meditating_girl}
                width={500}
                height={500}
                alt="Meditating girl"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">Meditation</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
