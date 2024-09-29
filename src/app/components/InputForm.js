import { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(minutes, seconds, player1Name, player2Name);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Timer</h1>
      <input
        type="text"
        placeholder="Player 1 Name"
        value={player1Name}
        onChange={(e) => setPlayer1Name(e.target.value)}
        required
        className="p-2 rounded text-black"
      />
      <input
        type="text"
        placeholder="Player 2 Name"
        value={player2Name}
        onChange={(e) => setPlayer2Name(e.target.value)}
        required
        className="p-2 rounded text-black"
      />
      <div className="flex justify-between">
        <select
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          className="p-2 rounded text-black"
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
          className="p-2 rounded text-black"
          placeholder="Player 1 Name"
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
