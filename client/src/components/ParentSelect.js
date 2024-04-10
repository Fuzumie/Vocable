import React, { useState } from 'react';
import ModeSelect from './ModeSelect';

function ParentSelect() {
  const [selectedMode, setSelectedMode] = useState('');

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <ModeSelect onSelect={handleModeSelect} />
      <p>Selected Mode: {selectedMode}</p>
    </div>
  );
}

export default ParentSelect;