/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import flappyPlane from "../../../../../assets/self-care/game/Default_poster_for_plane_game_0.jpg";
import ticTtoe from "../../../../../assets/self-care/game/Default_poster_for_tic_tac_toe_game_1.jpg";

const stories = [
  {
    href: "/member/selfCare/games/flappyPlane",
    src: flappyPlane,
    alt: "Flappy Plane",
    title: "Flappy Plane",
  },
  {
    href: "/member/selfCare/games/ticTacToe",
    src: ticTtoe,
    alt: "Tic Tac Toe",
    title: "Tic Tac Toe",
  },
];

const GamesPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-2xl text-black font-bold">
        <h1>Self-care</h1>
        <p>Stories that keep you going</p>
        <div className="grid grid-cols-2 gap-5 mt-8 px-4">
          {stories.map((story, index) => (
            <div
              key={index}
              className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg mb-8"
            >
              <Link href={story.href}>
                <Image
                  src={story.src}
                  width={500}
                  height={500}
                  alt={story.alt}
                />
                <div className="py-5 text-center">
                  <p className="block text-xl font-bold text-black">
                    {story.title}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
