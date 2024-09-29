import React from "react";

function formatTime(timeInSeconds) {
  if (isNaN(timeInSeconds) || timeInSeconds < 0) {
    return "00:00"; 
  }
  const minutes = Math.floor(timeInSeconds / 60); 
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}



const TimerDisplay = ({ playerName, time, onSwitch, isActive, isPlayer1 }) => {
  return (
    <div
      className={`flex flex-col ${
        isPlayer1 ? 'rotate-180' : ''
      }`}
    >
      <h2 className="text-2xl mb-2">{playerName}</h2>
      <div className="text-5xl font-bold text-center">
        {formatTime(time)} 
      </div>
      <button
        onClick={onSwitch}
        disabled={!isActive} 
        className={`mt-4 px-4 py-2 text-lg rounded h-60 ${
          isActive ? 'bg-red-500' : 'bg-blue-500 cursor-not-allowed'
        }`}
      >
        {isActive ? 'Stop' : 'Opponent Turn'}
      </button>
    </div>
  );
};

export default TimerDisplay;

