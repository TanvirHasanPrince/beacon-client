/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaPlay, FaPause } from "react-icons/fa";

import meditating_girl from "../../../../../assets/self-care/meditation/meditating_girl.jpg";
import boy_mountain_meditation from "../../../../../assets/self-care/meditation/A_boy_meditating_in_a_mountain_Surrounded_by_river.jpg";
import girl_rainbow_meditation from "../../../../../assets/self-care/meditation/A_girl_meditating_in_cloud_Surrounded_by_rainbow.jpg";
import girl_coffee_shop_meditation from "../../../../../assets/self-care/meditation/A_girl_meditating_in_a_coffee_shop_Here_eyes_are_closed.jpg";
import girl_forrest_meditation from "../../../../../assets/self-care/meditation/A_girl_meditating_in_a_forrest_shop_Here_eyes_are_closd.jpg";

const MeditationPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playlist, setPlaylist] = useState([
    {
      title: "Breating Exercise",
      src: "https://res.cloudinary.com/djytbyqgi/video/upload/v1716107693/beacon_uploads/meditation/wu3vbwszvysybkrlxh2h.mp3",
      image: meditating_girl,
    },
    {
      title: "Mountain Guided Meditation",
      src: "https://res.cloudinary.com/djytbyqgi/video/upload/v1716107693/beacon_uploads/meditation/vcoc6ple4jpfqctxj0uy.mp3",
      image: boy_mountain_meditation,
    },

    {
      title: "Mindfulness meditation",
      src: "https://res.cloudinary.com/djytbyqgi/video/upload/v1716107694/beacon_uploads/meditation/kbp3egnfjjlv8y0yaom5.mp3",
      image: girl_rainbow_meditation,
    },
    {
      title: "Sitting Meditation",
      src: "https://res.cloudinary.com/djytbyqgi/video/upload/v1716107695/beacon_uploads/meditation/txfczedaj6mkcdpjrgle.mp3",
      image: girl_coffee_shop_meditation,
    },
    {
      title: "Spirit in the Woods",
      src: "https://res.cloudinary.com/djytbyqgi/video/upload/v1716107696/beacon_uploads/meditation/gom4qgpnfskmyihe1p9m.mp3",
      image: girl_forrest_meditation,
    },
  ]);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    handleTrackChange(currentTrackIndex);
  }, [currentTrackIndex]);

  const handleClickPlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((error) => console.log("Audio play error:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (event.target.valueAsNumber / 100) * duration;
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    }
  };

  const handleTrackChange = (newIndex: number) => {
    if (audioRef.current) {
      audioRef.current.src = playlist[newIndex].src;
      audioRef.current.load();
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
          setCurrentTime(0);
          if (isPlaying) {
            audioRef.current
              .play()
              .catch((error) => console.log("Audio play error:", error));
          }
        }
      };
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      audio.addEventListener("timeupdate", updateTime);
      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  }, []);

  const handlePlaylistPlayPause = (index: number) => {
    if (currentTrackIndex === index) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          ?.play()
          .catch((error) => console.log("Audio play error:", error));
        setIsPlaying(true);
      }
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((error) => console.log("Audio play error:", error));
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4 overflow-hidden bg-center rounded-xl">
        <Image
          src={playlist[currentTrackIndex].image}
          width={500}
          height={500}
          alt="track image"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="song-info text-center text-black">
        <p className="text-lg font-bold">Now Playing</p>
        <p className="text-md">{playlist[currentTrackIndex].title}</p>
      </div>
      <button
        onClick={handleClickPlayPause}
        className={`hover:text-gray-200 focus:outline-none mt-4 ${
          isPlaying
            ? "bg-gradient-to-r from-violet-300 to-fuchsia-300 text-black"
            : "bg-gradient-to-r from-violet-300 to-fuchsia-300 text-black"
        } px-4 py-1 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center`}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={duration ? (currentTime / duration) * 100 : 0}
        onChange={handleProgressChange}
        className="w-full h-2 bg-black-200 rounded-lg mt-4 appearance-none cursor-pointer"
      />
      <div className="flex justify-center items-center text-sm text-black mt-2">
        <p className="px-4">
          Elapsed Time:{" "}
          {Math.floor(currentTime / 60)
            .toString()
            .padStart(2, "0")}
          :{(Math.floor(currentTime) % 60).toString().padStart(2, "0")}
        </p>
        {duration > 0 && (
          <p className="px-4">
            Total Time: {Math.floor(duration / 60)}:
            {Math.floor(duration % 60)
              .toString()
              .padStart(2, "0")}
          </p>
        )}
      </div>
      <div className="h-40 overflow-y-auto mt-4 w-full">
        {playlist.map((track, index) => (
          <div
            key={index}
            className={`playlist-item flex justify-between items-center mb-2 p-2 text-black rounded-lg ${
              index === currentTrackIndex
                ? "bg-gradient-to-r from-violet-300 to-fuchsia-300"
                : "bg-white"
            } shadow-md`}
          >
            <p className="text-sm font-medium">{track.title}</p>
            <button
              onClick={() => handlePlaylistPlayPause(index)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {index === currentTrackIndex && isPlaying ? (
                <FaPause />
              ) : (
                <FaPlay />
              )}
            </button>
          </div>
        ))}
      </div>
      <audio id="audioPlayer" ref={audioRef}></audio>
    </div>
  );
};

export default MeditationPage;
