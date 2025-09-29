import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClients";

export default function AgendaContatos() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [contatos, setContatos] = useState([]);

  // Carregar contatos do Supabase
  useEffect(() => {
    fetchContatos();
  }, []);

  const fetchContatos = async () => {
    const { data, error } = await supabase
      .from("contatos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.log("Erro ao buscar contatos:", error);
    else setContatos(data);
  };

  // Máscara de número
  const handleNumeroChange = (e) => {
    let raw = e.target.value.replace(/\D/g, ""); 
    let formatted = "";

    if (raw.length > 0) {
      if (raw.length <= 2) formatted = `(${raw}`;
      else if (raw.length <= 6) formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
      else if (raw.length <= 10) formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`;
      else formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
    }

    setNumero(formatted);
  };

  // Adicionar contato no Supabase
  const adicionarContato = async () => {
  if (!nome || !numero) return;

  const { data, error } = await supabase
    .from("contatos")
    .insert([{ nome, telefone: numero }])
    .select(); // <- importante!

  if (error) {
    console.log("Erro ao adicionar contato:", error);
  } else {
    setContatos([data[0], ...contatos]); // agora data[0] existe
  }

  setNome("");
  setNumero("");
};


  // Remover contato do Supabase
  const removerContato = async (id) => {
    const { error } = await supabase.from("contatos").delete().eq("id", id);
    if (error) console.log("Erro ao remover contato:", error);
    else setContatos(contatos.filter((c) => c.id !== id));
  };

  return (
    <section className="card">
      <h2>Agenda de Contatos</h2>
      <div>
        <input className="nomecontato"
          type="text"
          placeholder="Nome do contato"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input className="nomecontato"
          type="text"
          placeholder="Número"
          value={numero}
          onChange={handleNumeroChange}
        />
      </div>
      <button className="nomecontato" onClick={adicionarContato}>
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
