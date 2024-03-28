import React, { useState, createContext, useEffect } from 'react';
import BoardEz from '../components/wordle/easy/BoardEz'
import BoardMd from '../components/wordle/medium/Board'
import Keyboard from '../components/wordle/Keyboard'
import '../components/wordle/easy/Easy.css'
import '../components/wordle/Wordle.css'

export const AppContext = createContext();

function Wordle() {
  const [selectedMode, setSelectedMode] = useState('');
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  return (
    <div className='wordle'>
        
        <BoardEz/>
        <Keyboard/>

    </div>

  )
}

export default Wordle