import Image from "next/image";
import Link from "next/link";
import React from "react";
import breathB from "../../../../../assets/self-care/manage_anxiety/breathbe.jpg";
import tamet from "../../../../../assets/self-care/manage_anxiety/tame1.jpg";
import clearPath from "../../../../../assets/self-care/manage_anxiety/clearPath.jpg";
import relaxT from "../../../../../assets/self-care/manage_anxiety/relaxT.jpg";
import healthyHabits from "../../../../../assets/self-care/manage_anxiety/healthyHabits.jpg";
import release from "../../../../../assets/self-care/manage_anxiety/release.jpg";

const ManageAnxietyPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-2xl text-black font-bold">
        <h1>Self-care</h1>
        <p>Find Your Peace. Manage Your Anxiety.</p>
        <div className="grid grid-cols-2 gap-5 mt-8 px-4">
          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/manageAnxiety/1"}>
              <Image
                src={breathB}
                width={500}
                height={500}
                alt="Meditating girl"
              />
              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Calming Techniques
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/manageAnxiety/2"}>
              <Image
                src={tamet}
                width={500}
                height={500}
                alt="Mindfulness Techniques to Manage Anxiety"
              />
              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Mindfulness Techniques
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/manageAnxiety/1"}>
              <Image
                src={clearPath}
                width={500}
                height={500}
                alt="Cognitive Behavioral Techniques for Anxiety Relief"
              />
              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Cognitive Behavioral Techniques
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/manageAnxiety/1"}>
              <Image
                src={relaxT}
                width={500}
                height={500}
                alt="Relaxation Techniques"
              />
              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Relaxation Techniques
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/manageAnxiety/1"}>
              <Image
                src={healthyHabits}
                width={500}
                height={500}
                alt="Healthy Habits "
              />
              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Healthy Habits
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/manageAnxiety/1"}>
              <Image
                src={release}
                width={500}
                height={500}
                alt="Acceptance and Release "
              />
              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Acceptance and Release
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAnxietyPage;
