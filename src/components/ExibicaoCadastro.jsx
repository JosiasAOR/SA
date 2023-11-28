import React from "react";
import './ExiCadastro.css';

const ExibicaoCadastro = ({ dadosSalvos }) => {
  const disciplinasPorSemestre = {
    primeiro: [
      "Logica de programacao",
      "Eletronica",
      "Tecnologia da informacao",
    ],
    segundo: [
      "Programação de Aplicativos",
      "Banco de Dados",
      "Introdução ao Desenvolvimento de Projetos",
      "Introdução a Indústria 4.0",
    ],
    terceiro: [
      "Modelagem de Sistemas",
      "Manutenção de Sistemas",
      "Implantação de Sistema",
      "Internet das Coisas",
      "Sustentabilidade nos Processos Industriais",
      "Introdução a Qualidade e Produtividade",
    ],
    quarto: [
      "Teste de Sistemas",
      "Desenvolvimento de Sistemas",
      "Saúde e Segurança no Trabalho",
    ],
  };
  const { nome, curso, diasSemana, disciplina, semestreSelecionado } =
    dadosSalvos;

  return (
    <div className="exi-cadastro">
  <h2 className="dados-salvos-titulo">Dados Salvos:</h2>
  <ul className="dados-salvos-lista">
    <li className="dados-salvos-item">
      <p><strong className="dados-salvos-label">Nome:</strong> {nome}</p>
      <p><strong className="dados-salvos-label">Curso:</strong> {curso}</p>
      <p><strong className="dados-salvos-label">Dias da Semana:</strong> {diasSemana.join(", ")}</p>
      <p><strong className="dados-salvos-label">Disciplina:</strong> {disciplina}</p>
      <p><strong className="dados-salvos-label">Semestre:</strong> {semestreSelecionado}</p>
    </li>
  </ul>
</div>
  );
};

export default ExibicaoCadastro;
