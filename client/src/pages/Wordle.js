import React from 'react'
import BoardEz from '../components/wordle/easy/BoardEz'
import BoardMd from '../components/wordle/medium/Board'
import Keyboard from '../components/wordle/Keyboard'
import '../components/wordle/easy/Easy.css'
import '../components/wordle/Wordle.css'

function Wordle() {
  return (
    <div className='wordle'>
        
        <BoardEz/>
        <Keyboard/>

    </div>

  )
}

export default Wordle