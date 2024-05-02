import React from 'react'
import { Link } from 'react-router-dom';



function CreateVocabModal({closeModal}) {

  return (
    <div className="modalBackground">
        <div className="modalContainer">
        <div className="titleCloseBtn">
            <button
            onClick={() => {closeModal(false);}}>X</button>
        </div>
        <div className="title">
            <h1>Please name your vocabulary</h1>
        </div>
        <div className="body">
        
        
        </div>
        <div className="footer">
        
        </div>
        </div>
  </div>
);
}
  

export default CreateVocabModal