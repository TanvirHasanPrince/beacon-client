import Image from "next/image";
import Link from "next/link";
import React from "react";
import meditating_girl from "../../../../assets/self-care/meditation/meditating_girl.jpg";
import boy_listening_to_music from "../../../../assets/self-care/music/boy_listening_to_music.jpg";
import girl_reading_book from "../../../../assets/self-care/stories/girl_reading_a_book_in_a_room.jpg";
import boy_walking_in_forrest from "../../../../assets/self-care/manage_anxiety/Boy_walking_in_a_forest.jpg";
import girl_doing_yoga from "../../../../assets/self-care/yoga/girl_doing_yoga.jpg";

const SelfCareHomePage = () => {
  return (
    <>
      <div className=" flex flex-col justify-center items-center">
        <div className="mt-8">
          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/meditation"}>
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
            <Link href={"/member/selfCare/music"}>
              <Image
                src={boy_listening_to_music}
                width={500}
                height={500}
                alt="boy_listening_to_music"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">Music</p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/stories"}>
              <Image
                src={girl_reading_book}
                width={500}
                height={500}
                alt="gir_reading_book"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">Stories</p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/manageAnxiety"}>
              <Image
                src={boy_walking_in_forrest}
                width={500}
                height={500}
                alt="boy_walking_in_forrest"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">
                  Manage Anxiety
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8">
            <Link href={"/member/selfCare/yoga"}>
              <Image
                src={girl_doing_yoga}
                width={500}
                height={500}
                alt="girl_exercising"
              />

              <div className="py-5 text-center">
                <p className="block text-xl font-bold text-black">Yoga</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelfCareHomePage;
