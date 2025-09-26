import React, { useState } from "react";

export default function AgendaContatos() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [contatos, setContatos] = useState([
    { id: 1, nome: "João", telefone: "(44) 91234-1234" },
  ]);

  // mascara de número
  const handleNumeroChange = (e) => {
    let raw = e.target.value.replace(/\D/g, ""); 

    let formatted = "";

    if (raw.length > 0) {
      if (raw.length <= 2) {
        formatted = `(${raw}`;
      } else if (raw.length <= 6) {
        formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
      } else if (raw.length <= 10) {
        formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`;
      } else {
        formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
      }
    }

    setNumero(formatted);
  };

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
          onChange={handleNumeroChange}
        />
      </div>

      <button className="btn-small" onClick={adicionarContato}>
        Salvar na Agenda
      </button>

      <h3>Seus Contatos ({contatos.length})</h3>
      <div className="contacts">
        {contatos.map((contato) => (
          <div key={contato.id} className="contact-item">
            <div>
              <div className="contato-nome">{contato.nome}</div>
              <div className="contato-numero">{contato.telefone}</div>
            </div>
            <div className="contact-actions">
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
