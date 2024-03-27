import React from 'react'
import { Link } from 'react-router-dom';
import ModeSelect from './ModeSelect';


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
            <ModeSelect/>
        </div>
        <div className="footer">
        <Link to="/wordle">
            <button>Start</button>
            </Link>
        </div>
        </div>
  </div>
);
}
  

export default Modal