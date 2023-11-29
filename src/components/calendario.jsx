import React, { useState, useEffect } from "react";
import "./calendarioCSS.css";
import axios from "axios";

export default function Calendario() {
  const [data, setData] = useState([]);
  const [semestreSelecionado, setSemestreSelecionado] = useState("Quarto");

  useEffect(() => {
    apiProfessor();
  }, []);

  function apiProfessor() {
    axios
      .get(`https://apiprofessores.onrender.com/professores`)
      .then((response) => {
        const professores = response.data?.professores;
        setData(professores || []);
        console.log(professores);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }

  const professoresDoSemestre = data.filter(
    (professor) =>
      professor.semestreselecionado &&
      professor.semestreselecionado.toLowerCase() === semestreSelecionado.toLowerCase()
  );

  return (
    <div>
      <div
        className="semestres"
      >
        <h2>Calendário Semanal</h2>
        <ul className="semestresTit">
          {["Primeiro", "Segundo", "Terceiro", "Quarto"].map((semestre) => (
            <button className="buttonSemestre"
              key={semestre}
              onClick={() => setSemestreSelecionado(semestre)}
            >
              {semestre}° Semestre
            </button>
          ))}
        </ul>
        <h3>{semestreSelecionado}° Semestre</h3>
        <div className="listaCad">
          {professoresDoSemestre.map((professor) => (
            <li key={professor.id} className="listaCadastro">
              <p><b>Nome:</b> {professor.nome}</p>
              <p><b>Curso:</b> {professor.curso}</p>
              <p><b>Dias da Semana:</b> {professor.diassemana?.join(", ")}</p>
              <p><b>Disciplina:</b> {professor.disciplina}</p>
              <button onClick={()=>{
                 axios
                 .delete(`https://apiprofessores.onrender.com/deletar/${professor.id}`)
                 .then((response) => {
                   console.log(response);
                 })
                 .catch((error) => {
                   console.error("Erro ao buscar os dados:", error);
                 });
              }} style={{color: "red"}}>Deletar</button>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
