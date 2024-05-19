"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import meditating_girl from "../../../../../assets/self-care/meditation/meditating_girl.jpg";

const MeditationPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playlist, setPlaylist] = useState([
    {
      title: "Electrifying Start",
      src: "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/lose.ogg",
    },
    { title: "Moonlit Serenade", src: "/path/to/dancing-in-the-moonlight.mp3" },
    { title: "Tropical Getaway", src: "/path/to/your/tropical-track.mp3" },
    { title: "Enchanted Forest", src: "/path/to/your/mystical-track.mp3" },
    { title: "Heartfelt Ballad", src: "/path/to/your/emotional-track.mp3" },
    { title: "Upbeat Fiesta", src: "/path/to/your/high-energy-track.mp3" },
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
      audioRef.current.currentTime = newTime; // Update audio position
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

  const handlePlaylistPlay = (index: any) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) => console.log("Audio play error:", error));
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4 overflow-hidden bg-center rounded-3xl">
        <Image
          src={meditating_girl}
          width={350}
          height={350}
          alt="meditation"
        />
      </div>
      <div className="song-info text-center">
        <p>Now Playing</p>
        <p>{playlist[currentTrackIndex].title}</p>
      </div>
      <button
        onClick={handleClickPlayPause}
        className="hover:text-gray-200 focus:outline-none mt-4"
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
      <div className="flex justify-between text-sm mt-4">
        <p>{Math.floor(currentTime)} seconds</p>
        {duration > 0 && (
          <p>
            {Math.floor(duration / 60)}:
            {Math.floor(duration % 60)
              .toString()
              .padStart(2, "0")}
          </p>
        )}
      </div>
      <div className="playlist h-40 overflow-y-auto mt-4 w-full">
        {playlist.map((track, index) => (
          <div
            key={index}
            className={`playlist-item flex justify-between items-center mb-2 p-2 text-black rounded-2xl ${
              index === currentTrackIndex ? "bg-[#4cdf9f]" : ""
            }`}
          >
            <p>{track.title}</p>
            <button onClick={() => handlePlaylistPlay(index)}>
              {index === currentTrackIndex && isPlaying ? "Playing" : "Play"}
            </button>
          </div>
        ))}
      </div>
      <audio id="audioPlayer" ref={audioRef}></audio>
    </div>
  );
};

export default MeditationPage;
