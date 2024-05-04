import React from 'react'
import { Link } from 'react-router-dom';



function Modal({closeModal}) {

  return (
    <div className="modalBackground">
        <div className="modalContainer">
        <div className="titleCloseBtn">
            <button
            onClick={() => {closeModal(false);}}>X</button>
        </div>
        <div className="title">
            <h1>Please select a difficulty</h1>
        </div>
        <div className="body">
        
        <Link to="/easy">
            <button>Easy</button>
            </Link>
        <Link to="/wordle">
          <button>Medium</button>
        </Link>    
        </div>
        <div className="footer">
        
        </div>
        </div>
  </div>
);
}
  

export default Modal