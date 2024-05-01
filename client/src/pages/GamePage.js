import Wordle from '../components/wordle/medium/Wordle';
import { useEffect, useState } from 'react'




function GamePage() {
 
  const [solution, setSolution] = useState(null)
  
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
          setSolution(data[randomIndex].word);
        }
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };

    fetchAndSelectRandomWord();
  }, []);
  return (
    <div className="App">
      <h1>Wordle (Lingo)</h1>
      <p>{solution}</p>
      {solution && <Wordle solution={solution} />}
    </div>
  )
}



export default GamePage