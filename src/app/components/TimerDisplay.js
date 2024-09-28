// components/TimerDisplay.js
import React from "react";

const TimerDisplay = ({ playerName, time, onSwitch, isActive, isPlayer1 }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div
      className="flex flex-col items-center gap-6 mt-4 mb-4"
      style={isPlayer1 ? { transform: "rotate(180deg)" } : {}}
    >
      <h2 className="text-4xl font-bold">{playerName}</h2>
      <div
        className={`bg-blue-500 text-4xl font-mono px-8 py-4 rounded-xl mb-2 ${
          isActive ? "border-4 border-yellow-500" : ""
        }`}
        // Apply rotation for Player 1
      >
        {formatTime(time)}
      </div>
      <button
        onClick={onSwitch}
        className={`bg-red-500 text-white text-[2rem] w-full py-10 rounded-full ${
          !isActive ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!isActive} // Disable the button if it's not the active player's turn
      >
        Pass
      </button>
    </div>
  );
};

export default TimerDisplay;
