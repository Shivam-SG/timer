"use client";
import { useState, useEffect } from "react";
import InputForm from "./InputForm";
import TimerDisplay from "./TimerDisplay";

export default function Timer() {
  const [player1Time, setPlayer1Time] = useState(0); 
  const [player2Time, setPlayer2Time] = useState(0); 
  const [activePlayer, setActivePlayer] = useState(null); 
  const [isRunning, setIsRunning] = useState(false); 
  const [gameStarted, setGameStarted] = useState(false); 
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [winner, setWinner] = useState(null); 

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

    if (player1Time === 0 && !winner) {
      setIsRunning(false);
      setWinner(player2Name); 
    } else if (player2Time === 0 && !winner) {
      setIsRunning(false);
      setWinner(player1Name); 
    }

    return () => clearInterval(timer);
  }, [
    isRunning,
    player1Time,
    player2Time,
    activePlayer,
    player1Name,
    player2Name,
    winner,
  ]);

  const handleStart = (minutes, seconds, player1Name, player2Name) => {
    const totalSeconds = minutes * 60 + seconds;
    setPlayer1Time(totalSeconds);
    setPlayer2Time(totalSeconds); 
    setPlayer1Name(player1Name); 
    setPlayer2Name(player2Name); 
    setIsRunning(true);
    setActivePlayer(1);
    setGameStarted(true);
    setWinner(null);
  };

  // Switch between players
  const handlePlayerSwitch = () => {
    if (isRunning) {
      setActivePlayer(activePlayer === 1 ? 2 : 1); 
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
        <div className="flex flex-col w-full">
          <TimerDisplay
            playerName={player1Name}
            time={player1Time}
            onSwitch={handlePlayerSwitch}
            isActive={activePlayer === 1}
            isPlayer1={true}
          />

          <hr className="border-t-2 border-gray-400 w-full my-4" />

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
