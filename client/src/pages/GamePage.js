import React, { useState, useEffect } from 'react';
import Wordle from '../components/wordle/Wordle';

function GamePage() {
  const [solution, setSolution] = useState(null);
  const [definition, setDefinition] = useState(null);

  useEffect(() => {
    const fetchAndSelectRandomWord = async () => {
      try {
        const response = await fetch('/api/getwords');
        if (!response.ok) {
          throw new Error('Error fetching words');
        }
        const data = await response.json();
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const selectedWord = data[randomIndex];
          setSolution(selectedWord.word);
          setDefinition(selectedWord.definition);
        }
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };

    fetchAndSelectRandomWord();
  }, []);

  return (
    <div className="App">
      <p>{solution}</p>
      {solution && <Wordle solution={solution} definition={definition} />}
    </div>
  );
}

export default GamePage;


