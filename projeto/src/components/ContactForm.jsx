import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClients";

export default function AgendaContatos() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [contatos, setContatos] = useState([]);

  // estados para edição
  const [editando, setEditando] = useState(false);
  const [contatoAtual, setContatoAtual] = useState(null);
  const [editNome, setEditNome] = useState("");
  const [editNumero, setEditNumero] = useState("");

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
    setEditNome(contato.nome || "");
    setEditNumero(contato.telefone || "");
    setEditando(true);
  };

  const cancelarEdicao = () => {
    setEditando(false);
    setContatoAtual(null);
    setEditNome("");
    setEditNumero("");
  };

  const salvarEdicao = async () => {
    if (!contatoAtual) return;
    if (!editNome.trim() || !editNumero.trim()) return;

    const { error } = await supabase
      .from("contatos")
      .update({ nome: editNome.trim(), telefone: editNumero.trim() })
      .eq("id", contatoAtual.id);

    if (error) {
      console.error("Erro ao editar contato:", error);
      return;
    }

    setContatos((prev) =>
      prev.map((c) =>
        c.id === contatoAtual.id
          ? { ...c, nome: editNome.trim(), telefone: editNumero.trim() }
          : c
      )
    );

    cancelarEdicao();
  };

  return (
    <section className="card">
      <h2>Agenda de Contatos</h2>

      <div className="form-row">
        <input
          className="nomecontato"
          type="text"
          placeholder="Nome do contato"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="nomecontato"
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
              <button type="button">Mensagem</button>
              <button type="button" onClick={() => abrirEdicao(contato)}>
                Editar
              </button>
              <button className="button-excluir" onClick={() => removerContato(contato.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {editando && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <h3>Editar Contato</h3>

            <input
              type="text"
              placeholder="Nome"
              value={editNome}
              onChange={(e) => setEditNome(e.target.value)}
            />
            <input
              type="text"
              placeholder="Número"
              value={editNumero}
              onChange={handleEditNumeroChange}
            />

            <div className="modal-actions">
              <button type="button" onClick={salvarEdicao}>
                Salvar
              </button>
              <button type="button" onClick={cancelarEdicao}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
