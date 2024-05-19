/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import mountainPose from "../../../../../assets/self-care/yoga/mountainPose.jpg";
import catCowPose from "../../../../../assets/self-care/yoga/catCowPose.jpg";
import fakeDownDog from "../../../../../assets/self-care/yoga/fakeDowndog.jpg";
import childsPose from "../../../../../assets/self-care/yoga/childsPose.jpg";
import w2 from "../../../../../assets/self-care/yoga/w2.jpg";
import treePose from "../../../../../assets/self-care/yoga/treePose.jpg";

const YogaPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-2xl text-black font-bold">
        <h1>Self-care</h1>
        <p>Yoga for the mind & body.</p>
        <div className="grid grid-cols-2 gap-5 mt-8 px-4">
          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/yoga/1"}>
              <Image
                src={mountainPose}
                width={500}
                height={500}
                alt="Mountain Pose (Tadasana)"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Mountain Pose (Tadasana)
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/yoga/2"}>
              <Image
                src={catCowPose}
                width={500}
                height={500}
                alt="Mountain Pose (Tadasana)"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Cat-Cow Pose (Marjaryasana & Bitilasana)
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/yoga/1"}>
              <Image
                src={fakeDownDog}
                width={500}
                height={500}
                alt="Downward-Facing Dog (Adho Mukha Svanasana)"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Downward-Facing Dog (Adho Mukha Svanasana)
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/yoga/1"}>
              <Image
                src={childsPose}
                width={500}
                height={500}
                alt="Child's Pose (Balasana)"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Child's Pose (Balasana)
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/yoga/1"}>
              <Image
                src={w2}
                width={500}
                height={500}
                alt="Warrior II Pose (Virabhadrasana II)"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Warrior II Pose (Virabhadrasana II)
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/yoga/1"}>
              <Image
                src={treePose}
                width={500}
                height={500}
                alt="Tree Pose (Vrksasana)"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Tree Pose (Vrksasana)
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YogaPage;
