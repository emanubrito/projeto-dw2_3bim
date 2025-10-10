import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClients";
import ContatoList from "./ContactItem";
import EditContact from "./EditContact";

export default function AgendaContatos() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [contatos, setContatos] = useState([]);

  // estados para edição
  const [editando, setEditando] = useState(false);
  const [contatoAtual, setContatoAtual] = useState(null);

  useEffect(() => {
    fetchContatos();
  }, []);

  const fetchContatos = async () => {
    const { data, error } = await supabase
      .from("contatos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar contatos:", error);
    } else {
      setContatos(data || []);
    }
  };

  const formatTelefone = (value) => {
    const raw = (value || "").replace(/\D/g, "");
    if (!raw) return "";
    if (raw.length <= 2) return `(${raw}`;
    if (raw.length <= 6) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    if (raw.length <= 10)
      return `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`;
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
  };

  const handleNumeroChange = (e) => setNumero(formatTelefone(e.target.value));
  const handleEditNumeroChange = (e) =>
    setEditNumero(formatTelefone(e.target.value));

  const adicionarContato = async () => {
    if (!nome.trim() || !numero.trim()) return;

    const { data, error } = await supabase
      .from("contatos")
      .insert([{ nome: nome.trim(), telefone: numero.trim() }])
      .select();

    if (error) {
      console.error("Erro ao adicionar contato:", error);
      return;
    }

    if (data && data[0]) {
      setContatos((prev) => [data[0], ...prev]);
    }

    setNome("");
    setNumero("");
  };

  const removerContato = async (id) => {
    const { error } = await supabase.from("contatos").delete().eq("id", id);
    if (error) {
      console.error("Erro ao remover contato:", error);
      return;
    }
    setContatos((prev) => prev.filter((c) => c.id !== id));
  };

  const abrirEdicao = (contato) => {
    setContatoAtual(contato);
    setEditando(true);
  };

  return (
    <section className="card">
     

      <h2 className="com-icone"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00b303" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-icon lucide-circle-user"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>Agenda de Contatos</h2>

      <div className="form-row">
        <input
          className="nomecontato"
          type="text"
          placeholder="Nome do contato"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="numerocontato"
          type="text"
          placeholder="Número"
          value={numero}
          onChange={handleNumeroChange}
        />
      </div>

      <button className="btn-small com-icone" onClick={adicionarContato}>
       <span class="material-symbols-outlined">person_add</span>
       Salvar na Agenda
      </button>

      <h3>Seus Contatos ({contatos.length})</h3>

      <ContatoList
        contatos={contatos}
        removerContato={removerContato}
        abrirEdicao={abrirEdicao}
        onEnviarMensagem={(numero) => onSelecionarNumero(numero)}
      />
      <EditContact
        contatoAtual={contatoAtual}
        setContatoAtual={setContatoAtual}
        editando={editando}
        setEditando={setEditando}
        setContatos={setContatos}
        formatTelefone={formatTelefone}
      />
    </section>
  );
}
