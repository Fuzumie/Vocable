import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal';
import { Link, useSearchParams } from 'react-router-dom';


function Home({selectedMode}) {
  const [OpenModal, setOpenModal] = useState(false);
  
  
  return (
    <div className="home">
      <div className="headerContainer">
      
      </div><div className='body'>
      
      <button className='selector' onClick={()=>{setOpenModal(true)}}>Play</button>
      {OpenModal && <Modal closeModal={setOpenModal}/>}
      
      </div>
    </div>
  )
}

export default Home