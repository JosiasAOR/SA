import React, { useState } from "react";

export default function Calendario({}) {
  const [date, setDate] = useState(new Date());  

  return (
    <div>
      <div className="semestres" style={{display:'flex',flexDirection:'column',alignItems:'center',backgroundColor:'gray'}}>
        <h2>Calendario Semanal</h2>
      <ul style={{display:'flex'}}>
        <button style={{padding:10,margin:10}}>1° Semestre</button>
        <button style={{padding:10,margin:10}}>2° Semestre</button>
        <button style={{padding:10,margin:10}}>3° Semestre</button>
        <button style={{padding:10,margin:10}}>4° Semestre</button>
      </ul>

      </div>
    </div>
  );
}
