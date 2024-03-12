import React from 'react'
import Board from '../components/wordle/easy/Board'
import Keyboard from '../components/wordle/Keyboard'
import '../components/wordle/easy/Easy.css'
import '../components/wordle/Wordle.css'

function Wordle() {
  return (
    <div className='wordle'>
        
        <Board/>
        <Keyboard/>

    </div>

  )
}

export default Wordle