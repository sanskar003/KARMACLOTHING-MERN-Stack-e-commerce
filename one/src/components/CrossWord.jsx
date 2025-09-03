import React, { useState } from "react";

const crosswordData = [
  [{ num: "1", value: "" }, { value: "" }, { value: "" }, { value: "" }], // CODE
  [{ value: "" }, { value: "O" }, { value: "" }, { value: "" }], // Fixed letter 'O'
  [{ num: "2", value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }], // REACT
  [{ value: "" }, { value: "S" }, { value: "" }, { value: "" }], // Fixed letter 'S'
  [{ num: "3", value: "" }, { value: "" }, { value: "" }], // JSX
];

const answers = {
  "0-0": "C", "0-1": "O", "0-2": "D", "0-3": "E",
  "2-0": "R", "2-1": "E", "2-2": "A", "2-3": "C", "2-4": "T",
  "4-0": "J", "4-1": "S", "4-2": "X",
};

const Crossword = () => {
  const [grid, setGrid] = useState(crosswordData);

  const handleChange = (event, rowIndex, colIndex) => {
    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex].value = event.target.value.toUpperCase().slice(-1); 
    setGrid(updatedGrid);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Simple Crossword Puzzle</h1>

      <table className="border-collapse border-2 border-black">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                const isCorrect = cell.value === answers[`${rowIndex}-${colIndex}`];

                return (
                  <td key={`${rowIndex}-${colIndex}`} className="border border-black w-12 h-12 relative text-center">
                    {cell.num && (
                      <span className="absolute top-0 left-1 text-xs text-gray-600">{cell.num}</span>
                    )}
                    {cell.value !== "O" && cell.value !== "S" ? (
                      <input
                        type="text"
                        maxLength="1"
                        value={cell.value}
                        onChange={(e) => handleChange(e, rowIndex, colIndex)}
                        className={`w-full h-full text-center font-mono text-lg outline-none ${
                          isCorrect ? "bg-green-400 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-500 text-white flex items-center justify-center">{cell.value}</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Crossword;