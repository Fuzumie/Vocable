import React, { useEffect, useState } from 'react';
import './Wordle.css';
import lettersData from './letters.json'; // Import the JSON file directly

export default function Keypad({ usedKeys }) {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    // Set the letters state with the data from the imported JSON file
    setLetters(lettersData.letters);
  }, []);

  return (
    <div className="keypad">
      <div className="row_key">
        {letters.slice(0, 10).map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color}>
              {l.key}
            </div>
          );
        })}
      </div>
      <div className="row_key">
        {letters.slice(10, 19).map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color}>
              {l.key}
            </div>
          );
        })}
      </div>
      <div className="row_key">
        {letters.slice(19).map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color}>
              {l.key}
            </div>
          );
        })}
      </div>
    </div>
  );
}