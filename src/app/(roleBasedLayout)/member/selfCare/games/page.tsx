"use client";
import { tailwindButtonClass } from "@/components/tailwindClasses";
import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: any) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (board: any) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tic Tac Toe</h1>
      <div style={styles.status}>{status}</div>
      <div style={styles.board}>
        {board.map((cell, index) => (
          <div
            key={index}
            style={styles.cell}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <button className={`${tailwindButtonClass} mt-4`} onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    // background: "linear-gradient(to right, #ffecd2, #fcb69f)",
  },
  title: {
    fontSize: "36px",
    margin: "20px",
    color: "#333",
  },
  status: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#555",
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 100px)",
    gridGap: "10px",
  },
  cell: {
    width: "100px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    border: "2px solid #555",
    background: "#fff",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  cellHover: {
    background: "#f0f0f0",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
  buttonHover: {
    background: "#555",
  },
};

export default TicTacToe;
