import React, { useState }from 'react'


function ModeSelect() {
  
  const [value, setValue] = useState('')
  const modes =[
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  function handleSelect(event){
    setValue(event.target.value)
  }
   
  return (
    <select className='mode-select' onChange={handleSelect}>
      {modes.map(mode => (
        <option key={mode.value} value ={mode.value}> {mode.label} </option>
      ))}
    </select>
    
  )
}

export default ModeSelect