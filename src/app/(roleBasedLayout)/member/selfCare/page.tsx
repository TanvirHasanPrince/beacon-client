import Image from "next/image";
import Link from "next/link";
import React from "react";
import meditating_girl from "../../../../assets/self-care/meditation/meditating_girl.jpg";
import boy_listening_to_music from "../../../../assets/self-care/music/boy_listening_to_music.jpg";
import girl_reading_book from "../../../../assets/self-care/stories/girl_reading_a_book_in_a_room.jpg";
import boy_walking_in_forrest from "../../../../assets/self-care/manage_anxiety/Boy_walking_in_a_forest.jpg";
import girl_exercising from "../../../../assets/self-care/exercise/A_girl_running_on_a_scenic_trail.jpg";

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
        </div>
      </div>
    </>
  );
};

export default SelfCareHomePage;