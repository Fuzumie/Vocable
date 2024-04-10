import React, { useState } from 'react';

function ModeSelect() {
  const [value, setValue] = useState('');
  const modes = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  function handleSelect(event) {
    const selectedValue = event.target.value;
    setValue(selectedValue);
  }

  return (
    <select className='mode-select' onChange={handleSelect} value={value}>
      {modes.map(mode => (
        <option key={mode.value} value={mode.value}>{mode.label}</option>
      ))}
    </select>
  );
}

export default ModeSelect;