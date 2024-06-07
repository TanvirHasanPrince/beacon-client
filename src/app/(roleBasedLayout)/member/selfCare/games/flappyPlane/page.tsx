/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaPlane, FaSkull } from "react-icons/fa";

const FlappyPlane = () => {
  const [planePosition, setPlanePosition] = useState(100); // Initial vertical position of the plane
  const [gameStarted, setGameStarted] = useState(false); // Flag to check if the game has started
  const [obstacleHeight, setObstacleHeight] = useState(200); // Initial height of the obstacle
  const [obstacleLeft, setObstacleLeft] = useState(500); // Initial horizontal position of the obstacle
  const [score, setScore] = useState(0); // Initial score
  const [gameOver, setGameOver] = useState(false); // Flag to check if the game is over

  // Constants defining game area dimensions and plane characteristics
  const gameHeight = 795;
  const gameWidth = 500;
  const planeSize = 50;
  const gravity = 4; // How fast the plane falls
  const jumpHeight = 60; // How high the plane jumps
  const obstacleWidth = 60;

  // Reference to the game area for handling user interactions
  const gameAreaRef = useRef(null);

  // Effect to handle the plane falling due to gravity when the game is running
  useEffect(() => {
    let gameInterval: any;
    if (gameStarted && planePosition < gameHeight - planeSize) {
      gameInterval = setInterval(() => {
        setPlanePosition((pos) => pos + gravity);
      }, 24); // plane position updates every 24 milliseconds
    }

    // If the plane hits the bottom of the game area, end the game
    if (planePosition >= gameHeight - planeSize) {
      setGameStarted(false);
      setGameOver(true);
    }

    // Cleanup the interval when the component unmounts or dependencies change
    return () => clearInterval(gameInterval);
  }, [planePosition, gameStarted]);

  // Effect to handle the obstacle movement when the game is running
  useEffect(() => {
    let obstacleInterval: any;
    if (gameStarted) {
      obstacleInterval = setInterval(() => {
        setObstacleLeft((left) => {
          if (left >= -obstacleWidth) return left - 5; // Move obstacle left
          // Reset obstacle position and randomize height
          setObstacleHeight(Math.floor(Math.random() * (gameHeight - 150)));
          return gameWidth;
        });
      }, 24); // Obstacle position updates every 24 milliseconds
    } else {
      setObstacleLeft(gameWidth); // Reset obstacle to the starting position
    }

    // Cleanup the interval when the component unmounts or dependencies change
    return () => clearInterval(obstacleInterval);
  }, [gameStarted]);

  // Function to handle plane jump when user clicks
  const handleJump = () => {
    if (!gameStarted) {
      setGameStarted(true); // Start the game if not already started
      setGameOver(false); // Ensure game over is reset
    }
    // Calculate new plane position after jump
    let newPlanePosition = planePosition - jumpHeight;
    if (newPlanePosition < 0) newPlanePosition = 0; // Prevent plane from going above the top
    setPlanePosition(newPlanePosition); // Update plane position
  };

  // Function to reset the game state to initial values
  const resetGame = () => {
    setPlanePosition(100);
    setObstacleLeft(500);
    setScore(0);
    setGameStarted(false);
    setGameOver(false);
  };

  // Function to check if the plane collides with the obstacle
  const isCollision = () => {
    const planeBottom = planePosition + planeSize;
    const obstacleTop = gameHeight - obstacleHeight;
    const obstacleRight = obstacleLeft + obstacleWidth;
    const obstacleLeftBoundary = obstacleLeft;

    return (
      planeBottom >= obstacleTop &&
      obstacleLeftBoundary <= planeSize &&
      obstacleRight >= 10
    );
  };

  // Effect to check for collisions and update score
  useEffect(() => {
    if (isCollision()) {
      setGameStarted(false); // Stop the game if there is a collision
      setGameOver(true); // Set game over state
    } else if (obstacleLeft === -obstacleWidth) {
      setScore((score) => score + 1); // Increase score if the obstacle has passed
    }
  }, [planePosition, obstacleLeft]);

  // Render the game area and elements
  return (
    <div
      ref={gameAreaRef}
      onClick={handleJump}
      style={{
        overflow: "hidden",
        position: "relative",
        height: `${gameHeight}px`,
        width: `${gameWidth}px`,

        backgroundColor: "skyblue",
      }}
    >
      {/* Render the plane */}
      <FaPlane
        style={{
          position: "absolute",
          top: `${planePosition}px`,
          left: "10px",
          width: `${planeSize}px`,
          height: `${planeSize}px`,
          color: "blue",
          display: gameOver ? "none" : "block",
        }}
      />
      {/* Render the obstacle */}
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: `${obstacleLeft}px`,
          width: `${obstacleWidth}px`,
          height: `${obstacleHeight}px`,
          backgroundColor: "#DDA0DD",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          display: gameOver ? "none" : "block",
        }}
      />
      {/* Display the score */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "24px",
          display: gameOver ? "none" : "block",
        }}
      >
        Score: {score}
      </div>
      {/* Display game over screen */}
      {gameOver && (
        <div
          style={{
            backgroundColor: "#333333",
            color: "#ffffff",
            fontFamily: "'Press Start 2P', cursive",
            textAlign: "center",
            padding: "50px",
            borderRadius: "10px",
            boxShadow: "0 0 20px pink",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
            <span style={{ color: "pink", textShadow: "2px 2px 0 #000000" }}>
              Game Over
            </span>
          </h1>
          <p style={{ fontSize: "24px", marginBottom: "30px" }}>
            Score: <span style={{ color: "pink" }}>{score}</span>
          </p>
          <button
            onClick={resetGame}
            style={{
              backgroundColor: "pink",
              color: "blue",
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "16px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)",
            }}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default FlappyPlane;
