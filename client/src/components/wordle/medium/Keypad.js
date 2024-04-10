import React, { useEffect, useState } from 'react'
import './Medium.css'

export default function Keypad({ usedKeys }) {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
      const fetchLetters = async () => {
        try {
          const response = await fetch('/letters.json'); // Fetch the JSON file from the public folder
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json(); // Parse JSON response
          setLetters(data.letters); // Update state with letters array
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchLetters(); // Invoke the fetch function
    }, []);  return (
    <div className="keypad">
      {letters && letters.map(l => {
        const color = usedKeys[l.key]
        return (
          <div key={l.key} className={color}>{l.key}</div>
        )
      })}
    </div>
  )
}