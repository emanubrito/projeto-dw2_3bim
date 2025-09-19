import React, { useState } from "react";

export default function ContactAgenda() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [contacts, setContatos] = useState([
    { id: 1, name: "João", phone: "(44) 91234-1234" },
  ]);

  const addContato = () => {
    if (!name || !number) return;
    const newContact = { id: Date.now(), name, phone: number };
    setContatos([...contacts, newContact]);
    setName("");
    setNumber("");
  };

  const removerContato = (id) => {
    setContatos(contacts.filter((c) => c.id !== id));
  };

  return (
    <section className="card">
      <h2>Agenda de Contatos</h2>

      <div className="form-row">
        <input
          type="text"
          placeholder="Nome do contato"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Número"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <button className="btn-small" onClick={addContato}>
        Salvar na Agenda
      </button>

      <h3>Seus Contatos ({contacts.length})</h3>
      <div className="contacts">
        {contacts.map((c) => (
          <div key={c.id} className="contact-item">
            <div>
              <div className="contato-nome">{c.name}</div>
              <div className="contato-numero">{c.phone}</div>
            </div>
            <div className="contact-actions">
              <button>Mensagem</button>
              <button>Editar</button>
              <button onClick={() => removerContato(c.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
