"use client";
import { useState, useEffect } from "react";
import InputForm from "./InputForm";
import TimerDisplay from "./TimerDisplay";

export default function Timer() {
  const [player1Time, setPlayer1Time] = useState(0); // Player 1 countdown
  const [player2Time, setPlayer2Time] = useState(0); // Player 2 countdown
  const [activePlayer, setActivePlayer] = useState(null); // Track active player
  const [isRunning, setIsRunning] = useState(false); // Start status
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [winner, setWinner] = useState(null); // New state to track the winner

  // Manage timers for active player
  useEffect(() => {
    let timer;
    if (isRunning && activePlayer === 1 && player1Time > 0) {
      timer = setInterval(() => {
        setPlayer1Time((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && activePlayer === 2 && player2Time > 0) {
      timer = setInterval(() => {
        setPlayer2Time((prev) => prev - 1);
      }, 1000);
    }

    if (player1Time === 0) {
      setIsRunning(false);
      setWinner(player2Name); // Player 2 wins if Player 1's time runs out
    } else if (player2Time === 0) {
      setIsRunning(false);
      setWinner(player1Name); // Player 1 wins if Player 2's time runs out
    }

    return () => clearInterval(timer);
  }, [
    isRunning,
    player1Time,
    player2Time,
    activePlayer,
    player1Name,
    player2Name,
  ]);

  const handleStart = (timeInMinutes, player1Name, player2Name) => {
    const timeInSeconds = timeInMinutes * 60;
    setPlayer1Time(timeInSeconds);
    setPlayer2Time(timeInSeconds);
    setPlayer1Name(player1Name);
    setPlayer2Name(player2Name);
    setIsRunning(true);
    setActivePlayer(1); // Player 1 starts first
    setGameStarted(true);
    setWinner(null); // Reset winner when game starts
  };

  const handlePlayerSwitch = () => {
    if (isRunning) {
      setActivePlayer(activePlayer === 1 ? 2 : 1); // Switch between Player 1 and Player 2
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {!gameStarted ? (
        <InputForm onSubmit={handleStart} />
      ) : winner ? (
        <div className="text-3xl font-bold text-green-400">
          {winner} is the Winner!
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Timer for Player 1 */}
          <TimerDisplay
            playerName={player1Name}
            time={player1Time}
            onSwitch={handlePlayerSwitch}
            isActive={activePlayer === 1}
            isPlayer1={true}
          />

          {/* Horizontal line */}
          <hr className="border-t-2 border-gray-400 w-full my-4" />

          {/* Timer for Player 2 */}
          <TimerDisplay
            playerName={player2Name}
            time={player2Time}
            onSwitch={handlePlayerSwitch}
            isActive={activePlayer === 2}
            isPlayer1={false}
          />
        </div>
      )}
    </div>
  );
}
