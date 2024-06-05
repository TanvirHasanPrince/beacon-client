import Image from "next/image";
import Link from "next/link";
import React from "react";
import meditating_girl from "../../../../assets/self-care/meditation/meditating_girl.jpg";
import boy_listening_to_music from "../../../../assets/self-care/music/boy_listening_to_music.jpg";
import girl_reading_book from "../../../../assets/self-care/stories/girl_reading_a_book_in_a_room.jpg";
import boy_walking_in_forrest from "../../../../assets/self-care/manage_anxiety/Boy_walking_in_a_forest.jpg";
import girl_doing_yoga from "../../../../assets/self-care/yoga/girl_doing_yoga.jpg";
import gamesPoster from "../../../../assets/self-care/game/trnengn.jpg";

const SelfCareHomePage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="mt-8 grid grid-cols-2 gap-4">
          {[
            {
              href: "/member/selfCare/meditation",
              src: meditating_girl,
              alt: "Meditating girl",
              label: "Meditation",
            },
            {
              href: "/member/selfCare/music",
              src: boy_listening_to_music,
              alt: "Boy listening to music",
              label: "Music",
            },
            {
              href: "/member/selfCare/stories",
              src: girl_reading_book,
              alt: "Girl reading book",
              label: "Stories",
            },
            {
              href: "/member/selfCare/manageAnxiety",
              src: boy_walking_in_forrest,
              alt: "Boy walking in forest",
              label: "Manage Anxiety",
            },
            {
              href: "/member/selfCare/yoga",
              src: girl_doing_yoga,
              alt: "Girl doing yoga",
              label: "Yoga",
            },
            {
              href: "/member/selfCare/games",
              src: gamesPoster,
              alt: "Games poster",
              label: "Games",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8"
            >
              <Link href={item.href}>
                <Image
                  src={item.src}
                  width={500}
                  height={500}
                  alt={item.alt}
                  className="object-cover"
                />
                <div className="py-5 text-center">
                  <p className="block text-xl font-bold text-black">
                    {item.label}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelfCareHomePage;
