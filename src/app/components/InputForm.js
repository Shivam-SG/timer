import { useState } from "react";
import toast from "react-hot-toast";

const InputForm = ({ onSubmit }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player1Error, setPlayer1Error] = useState(false); // Track error for player 1
  const [player2Error, setPlayer2Error] = useState(false); // Track error for player 2
  const [timeError, setTimeError] = useState(false); // Track time error

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // Player name validation
    if (player1Name.trim() === "") {
      setPlayer1Error(true);
      valid = false;
      toast.error("Player 1 name cannot be empty.");
    } else {
      setPlayer1Error(false);
    }

    if (player2Name.trim() === "") {
      setPlayer2Error(true);
      valid = false;
      toast.error("Player 2 name cannot be empty.");
    } else {
      setPlayer2Error(false);
    }

    // Time validation
    if (minutes === 0 && seconds === 0) {
      setTimeError(true);
      valid = false;
      toast.error("Please select a valid time.");
    } else {
      setTimeError(false);
    }

    // If validation passes, call onSubmit and display success toast
    if (valid) {
      onSubmit(minutes, seconds, player1Name, player2Name);
      toast.success("Countdown Started!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Timer</h1>
      <input
        type="text"
        placeholder="Player 1 Name"
        value={player1Name}
        onChange={(e) => setPlayer1Name(e.target.value)}
        className={`p-2 rounded text-black ${player1Error ? 'border-2 border-red-500' : ''}`}
      />
      <input
        type="text"
        placeholder="Player 2 Name"
        value={player2Name}
        onChange={(e) => setPlayer2Name(e.target.value)}
        className={`p-2 rounded text-black ${player2Error ? 'border-2 border-red-500' : ''}`}
      />
      <div className="flex justify-between">
        <select
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          className={`p-2 rounded text-black ${timeError ? 'border-2 border-red-500' : ''}`}
        >
          {[...Array(100).keys()].map((min) => (
            <option key={min} value={min}>
              {min} min
            </option>
          ))}
        </select>
        <select
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
          className={`p-2 rounded text-black ${timeError ? 'border-2 border-red-500' : ''}`}
        >
          {[...Array(60).keys()].map((sec) => (
            <option key={sec} value={sec}>
              {sec} sec
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="p-2 bg-blue-500 rounded">
        Start
      </button>
    </form>
  );
};

export default InputForm;
