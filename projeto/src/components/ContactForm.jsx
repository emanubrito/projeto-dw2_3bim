import React, { useState } from "react";

export default function AgendaContatos() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [contatos, setContatos] = useState([
    { id: 1, nome: "João", telefone: "(44) 91234-1234" },
  ]);

  const adicionarContato = () => {
    if (!nome || !numero) return;

    const novoContato = {
      id: Date.now(),
      nome,
      telefone: numero,
    };

    setContatos([...contatos, novoContato]);
    setNome("");
    setNumero("");
  };

  const removerContato = (id) => {
    setContatos(contatos.filter((contato) => contato.id !== id));
  };

  return (
    <section className="card">
      <h2>Agenda de Contatos</h2>

      <div className="form-row">
        <input
          type="text"
          placeholder="Nome do contato"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>

      <button className="btn-small" onClick={adicionarContato}>
        Salvar na Agenda
      </button>

      <h3>Seus Contatos ({contatos.length})</h3>
      <div >
        {contatos.map((contato) => (
          <div key={contato.id}>
            <div>
              <div >{contato.nome}</div>
              <div >{contato.telefone}</div>
            </div>
            <div >
              <button>Mensagem</button>
              <button>Editar</button>
              <button onClick={() => removerContato(contato.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
