import React, { useState, useEffect } from "react";
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
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h2>Calendario Semanal</h2>
        <ul style={{ display: "flex" }}>
          {["Primeiro", "Segundo", "Terceiro", "Quarto"].map((semestre) => (
            <button
              key={semestre}
              style={{ padding: 10, margin: 10 }}
              onClick={() => setSemestreSelecionado(semestre)}
            >
              {semestre}° Semestre
            </button>
          ))}
        </ul>

        <div>
          <h3>{semestreSelecionado}° Semestre</h3>
          {professoresDoSemestre.map((professor) => (
            <div key={professor.id} style={{ marginBottom: "15px" }}>
              <p>Nome: {professor.nome}</p>
              <p>Curso: {professor.curso}</p>
              <p>Dias da Semana: {professor.diassemana?.join(", ")}</p>
              <p>Disciplina: {professor.disciplina}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
