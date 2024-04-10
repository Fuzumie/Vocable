import React, { useState } from 'react';
import ModeSelect from './ModeSelect';
import WordGenerator from './wordle/easy/Words';
import Home from '../pages/Home'

function ParentComponent() {
  const [selectedMode, setSelectedMode] = useState('');

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <ModeSelect onSelect={handleModeSelect} />
      
      <Home selectedMode={selectedMode}/> 
    </div>
  );
}

export default ParentComponent;