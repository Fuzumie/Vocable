import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <div className="headerContainer">
      
      <p>yo what</p>
      
      <Link to="/wordle">
        <button>Play</button>
      </Link>

      </div>
     
    </div>
  )
}

export default Home