/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import music_listening_boy from "../../../../../assets/self-care/music/A_boy_listening_to_music_in_nature_.jpg";
import girl_music_coffee_shop from "../../../../../assets/self-care/music/Girl_listening_to_music_in_a_coffee_shop.jpg";
import girl_music_Eifel_tower from "../../../../../assets/self-care/music/Girl_listening_to_music_infront_pf_Eiffel_Tower.jpg";
import boy_lava_music from "../../../../../assets/self-care/music/Boy_listening_to_music_infront_of_lava_mountain.jpg";
import girl_forrst_floor_music from "../../../../../assets/self-care/music/_Girl_listening_to_music_sitting_on_the_forrest_floor.jpg";

const MusicPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playlist, setPlaylist] = useState([
    {
      title: "The Beat of Nature",
      src: "https://res.cloudinary.com/djytbyqgi/video/upload/v1716112080/beacon_uploads/music/scq0f6bx2vndvbhjvinl.mp3",
      image: music_listening_boy,
    },
    {
      title: "Forrest Lullaby",
      src: "https://res.cloudinary.com/djytbyqgi/video/upload/v1716112081/beacon_uploads/music/npeiz6vh7ire9oq2rutn.mp3",
      image: girl_music_coffee_shop,
    },

    {
      title: "Once in Paris",
      src: "https://res.cloudinary.com/djytbyqgi/video/upload/v1716107694/beacon_uploads/meditation/kbp3egnfjjlv8y0yaom5.mp3",
      image: girl_music_Eifel_tower,
    },
    {
      title: "Leva Eternity",
      src: "https://res.cloudinary.com/djytbyqgi/video/upload/v1716112081/beacon_uploads/music/rrni0mp4fao9xodsmdmu.mp3",
      image: boy_lava_music,
    },
    {
      title: "Lofi calmness",
      src: "https://res.cloudinary.com/djytbyqgi/video/upload/v1716112081/beacon_uploads/music/lhaqnfqivt72zunc9of7.mp3",
      image: girl_forrst_floor_music,
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

  const handleProgressChange = (event: any) => {
    if (audioRef.current) {
      const newTime = (event.target.value / 100) * duration;
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    }
  };

  const handleTrackChange = (newIndex: any) => {
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

  const handlePlaylistPlayPause = (index: any) => {
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
        />
      </div>
      <div className="song-info text-center">
        <p>Now Playing</p>
        <p>{playlist[currentTrackIndex].title}</p>
      </div>
      <button
        onClick={handleClickPlayPause}
        className={`hover:text-gray-200 focus:outline-none mt-4 ${
          isPlaying ? "bg-red-500 text-white" : "bg-green-500 text-white"
        } px-4 py-1 rounded-md font-semibold transition-colors duration-300 `}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={duration ? (currentTime / duration) * 100 : 0}
        onChange={handleProgressChange}
        className="w-full h-2 rounded-lg mt-4"
      />
       
      <div className="flex justify-center items-center text-sm">
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
              index === currentTrackIndex ? "bg-[#4cdf9f]" : ""
            }`}
          >
            <p>{track.title}</p>
            <button onClick={() => handlePlaylistPlayPause(index)}>
              {index === currentTrackIndex && isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        ))}
      </div>
      <audio id="audioPlayer" ref={audioRef}></audio>
    </div>
  );
};

export default MusicPage;
