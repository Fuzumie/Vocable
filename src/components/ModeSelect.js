import React from 'react'


function ModeSelect() {
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
        <mode value={mode.value}>{mode.lable}</mode>
      ))}
    </select>
  )
}

export default ModeSelect