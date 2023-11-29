import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cadastroCSS.css";

const disciplinasPorSemestre = {
  Primeiro: ["Logica de Programacao", "Eletronica", "Tecnologia da Informacao"],
  Segundo: [
    "Programação de Aplicativos",
    "Banco de Dados",
    "Introdução ao Desenvolvimento de Projetos",
    "Introdução a Indústria 4.0",
  ],
  Terceiro: [
    "Modelagem de Sistemas",
    "Manutenção de Sistemas",
    "Implantação de Sistema",
    "Internet das Coisas",
    "Sustentabilidade nos Processos Industriais",
    "Introdução a Qualidade e Produtividade",
  ],
  Quarto: [
    "Teste de Sistemas",
    "Desenvolvimento de Sistemas",
    "Saúde e Segurança no Trabalho",
  ],
};

const cursosTecnicos = [
  "Técnico em Desenvolvimento de Sistemas",
  "Técnico em Eletrônica",
  "Técnico em Redes de Computadores",
];

const Cadastro = ({ onSalvar }) => {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: "",
    curso: "",
    diasSemana: [],
    disciplina: "",
    semestreSelecionado: "",
  });

  const [disciplinasDisponiveis, setDisciplinasDisponiveis] = useState([]);

  useEffect(() => {
    if (dadosFormulario.semestreSelecionado) {
      const disciplinas =
        disciplinasPorSemestre[dadosFormulario.semestreSelecionado];
      setDisciplinasDisponiveis(disciplinas);
    }
  }, [dadosFormulario.semestreSelecionado]);

  const { nome, curso, diasSemana, disciplina, semestreSelecionado } =
    dadosFormulario;

  const handleDiaSemanaChange = (dia) => {
    if (diasSemana.includes(dia)) {
      setDadosFormulario({
        ...dadosFormulario,
        diasSemana: diasSemana.filter((d) => d !== dia),
      });
    } else {
      setDadosFormulario({
        ...dadosFormulario,
        diasSemana: [...diasSemana, dia],
      });
    }
  };

  const handleSemestreChange = (semestre) => {
    setDadosFormulario({
      ...dadosFormulario,
      semestreSelecionado: semestre,
      disciplina: "", // Limpa a disciplina quando o semestre é alterado
    });
  };

  const handleDisciplinaChange = (e) => {
    setDadosFormulario({
      ...dadosFormulario,
      disciplina: e.target.value,
    });
  };

  const handleCursoChange = (e) => {
    setDadosFormulario({
      ...dadosFormulario,
      curso: e.target.value,
    });
  };

  const handleSalvar = () => {
    axios
      .post(
        "https://apiprofessores.onrender.com/adicionar-professor",
        dadosFormulario
      )
      .then((response) => {
        console.log("Dados enviados com sucesso:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
      });
  };

  return (
    <div>
      <div className="Entrada">
        <div className="titulovar">
          <h2 className="titulo">Gerenciamento de horários</h2>
        </div>
        <ul>
          <h4 className="tituloH4">Nome:</h4>
          <input
            className="Nome"
            type="text"
            value={nome}
            onChange={(e) =>
              setDadosFormulario({ ...dadosFormulario, nome: e.target.value })
            }
          />
        </ul>
        <ul>
          <h4 className="tituloH4">Curso:</h4>
          <select className="Curso" value={curso} onChange={handleCursoChange}>
            <option value="">Selecione...</option>
            {cursosTecnicos.map((curso) => (
              <option key={curso} value={curso}>
                {curso}
              </option>
            ))}
          </select>
        </ul>
        <h4 className="tituloDiadaSemana">Dias da Semana:</h4>
        <ul style={{ display: "flex" }}>
          {["Segunda", "Terca", "Quarta", "Quinta", "Sexta"].map((dia) => (
            <li key={dia}>
              <h4>{dia}</h4>
              <input
                className="checkbox"
                type="checkbox"
                checked={diasSemana.includes(dia)}
                onChange={() => handleDiaSemanaChange(dia)}
              />
            </li>
          ))}
        </ul>
        <h4 className="tituloSemestre">Semestre:</h4>
        <ul style={{ display: "flex" }}>
          {["Primeiro", "Segundo", "Terceiro", "Quarto"].map((semestre) => (
            <li key={semestre}>
              <h4>{semestre}</h4>
              <input
                type="radio"
                checked={semestre === semestreSelecionado}
                onChange={() => handleSemestreChange(semestre)}
              />
            </li>
          ))}
        </ul>
        {semestreSelecionado ? (
          <ul>
            <h4 className="TitDisciplina">Disciplina:</h4>
            <select
              className="selecao"
              value={disciplina}
              onChange={handleDisciplinaChange}
            >
              {disciplinasDisponiveis.map((disciplina) => (
                <option key={disciplina} value={disciplina}>
                  {disciplina}
                </option>
              ))}
            </select>
          </ul>
        ) : (
          <ul>
            <h4 className="TitDisciplina">Disciplina:</h4>
            <select
              className="selecao"
              value={disciplina}
              onChange={handleDisciplinaChange}
            >
              {disciplinasDisponiveis.map((disciplina) => (
                <option select key={disciplina} value={disciplina}>
                  {disciplina}
                </option>
              ))}
            </select>
          </ul>
        )}
        <button className="button" onClick={handleSalvar}>
          Salvar
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
