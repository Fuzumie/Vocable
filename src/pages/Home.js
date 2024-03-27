import React from 'react'
import Modal from '../components/Modal';
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from "react";

function Home() {
  const [OpenModal, setOpenModal] = useState(false);
  
  return (
    <div className="home">
      <div className="headerContainer">
      
      <p>yo what</p>
      
      
      

      </div>
      <div className='body'>
      
      <button className='selector' onClick={()=>{setOpenModal(true)}}>Play</button>
      {OpenModal && <Modal closeModal={setOpenModal}/>}

      </div>
    </div>
  )
}

export default Home