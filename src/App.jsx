import React, { useState } from "react";
import Cadastro from "./components/cadastro";
import ExibicaoCadastro from "./components/ExibicaoCadastro";
import Calendario from "./components/calendario";

export default function App() {
  const [dadosSalvos, setDadosSalvos] = useState(null);

  function handleSalvar(dados) {
    setDadosSalvos(dados);
    console.log(dados)
  };

  return (
    <div style={{display:'flex'}}>
      <Cadastro onSalvar={handleSalvar} />
      {dadosSalvos && <ExibicaoCadastro dadosSalvos={dadosSalvos} />}
      <Calendario/>
    </div>
  );
}