import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';


function Home() {

  
  
  return (
    <div className="home">
      <div className="headerContainer">
      
      </div>
      <div className='home-body'>
      <p>This word game challenges your vocabulary skills!</p>
      <p>Guess the hidden word with limited attempts.</p>
      <p>Are you ready to test your word prowess?</p>
      <Link to="/wordle">
          <button>Play</button>
        </Link>  
      </div>
    </div>
  )
}

export default Home