// components/InputForm.js
import React, { useState } from "react";

const InputForm = ({ onSubmit }) => {
  const [time, setTime] = useState(); // Default to 5 minutes
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player1Name && player2Name && time > 0) {
      onSubmit(time, player1Name, player2Name);
    } else {
      alert("Please enter valid player names and time.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-4"
    >
      <h1 className="text-4xl font-bold mb-4">Timer</h1>
      <div>
        <label className="block text-lg">Player 1 Name:</label>
        <input
          type="text"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          className="p-2 rounded border border-gray-300 text-black"
          placeholder="Enter Player 1 Name"
        />
      </div>
      <div>
        <label className="block text-lg">Player 2 Name:</label>
        <input
          type="text"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          className="p-2 rounded border border-gray-300 text-black"
          placeholder="Enter Player 2 Name"
        />
      </div>
      <div>
        <label className="block text-lg">Set Time (in minutes):</label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 rounded border border-gray-300 text-black"
          placeholder="Enter minute"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Start
      </button>
    </form>
  );
};

export default InputForm;
