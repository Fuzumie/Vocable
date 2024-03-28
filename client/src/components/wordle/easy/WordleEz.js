import React, { useState, createContext, useEffect } from 'react';
import BoardEz from './BoardEz'
import Keyboard from '../Keyboard'
import '../components/wordle/easy/Easy.css'
import '../components/wordle/Wordle.css'

export const AppContext = createContext();

function Wordle() {
  
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  return (
    <div className='wordle'>
        
        <BoardEz/>
        <Keyboard/>

    </div>

  )
}

export default Wordle