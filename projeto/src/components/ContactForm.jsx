import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClients";
import ContatoList from "./ContactItem";
import EditContact from "./EditContact";
import FiltroCategoria from "./FiltroCategoria";
import "../styles/ContactForm.css";

export default function AgendaContatos() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [categoria, setCategoria] = useState("");
  const [contatos, setContatos] = useState([]);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Geral"); // controle do filtro

  // estados para edição
  const [editando, setEditando] = useState(false);
  const [contatoAtual, setContatoAtual] = useState(null);

  // estados para alertas
  const [alertaSalvar, setAlertaSalvar] = useState(false);
  const [alertaEditar, setAlertaEditar] = useState(false);
  const [alertaExcluir, setAlertaExcluir] = useState(false);

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

  const adicionarContato = async () => {
    if (!nome.trim() || !numero.trim() || !categoria.trim()) return;

    const { data, error } = await supabase
      .from("contatos")
      .insert([{ nome: nome.trim(), telefone: numero.trim(), categoria }])
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
    setCategoria("");

    // mostra alerta de salvar
    setAlertaSalvar(true);
    setTimeout(() => setAlertaSalvar(false), 2000);
  };

  const removerContato = async (id) => {
    const { error } = await supabase.from("contatos").delete().eq("id", id);
    if (error) {
      console.error("Erro ao remover contato:", error);
      return;
    }
    setContatos((prev) => prev.filter((c) => c.id !== id));

    // mostra alerta de excluir
    setAlertaExcluir(true);
    setTimeout(() => setAlertaExcluir(false), 2000);
  };

  const abrirEdicao = (contato) => {
    setContatoAtual(contato);
    setEditando(true);
  };

  // passa função para receber alerta ao salvar edição
  const handleEdicaoSalva = () => {
    setAlertaEditar(true);
    setTimeout(() => setAlertaEditar(false), 2000);
  };

  // Filtragem dos contatos conforme categoria selecionada
  const contatosFiltrados =
    categoriaSelecionada === "Geral"
      ? contatos
      : contatos.filter((c) => c.categoria === categoriaSelecionada);

  return (
    <section className="card">
      <h2 className="com-icone">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00b303"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-user"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="10" r="3" />
          <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
        </svg>
        Agenda de Contatos
      </h2>

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
        <select
          className="categoriacontato"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Geral</option>
          <option value="Família">Família</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Amigos">Amigos</option>
          <option value="Escola">Escola</option>
        </select>
      </div>

      <div className="salvar-area">
        <button className="btn-small com-icone" onClick={adicionarContato}>
          <span className="material-symbols-outlined">person_add</span>
          Salvar na Agenda
        </button>
        {alertaSalvar && <span className="alerta-msg sucesso">Contato salvo!</span>}
      </div>

      <FiltroCategoria
        categoriaSelecionada={categoriaSelecionada}
        setCategoriaSelecionada={setCategoriaSelecionada}
      />

      <h3>
        {categoriaSelecionada === "Geral"
          ? `Todos os Contatos (${contatos.length})`
          : `${categoriaSelecionada} (${contatosFiltrados.length})`}
      </h3>

      <ContatoList
        contatos={contatosFiltrados}
        removerContato={removerContato}
        abrirEdicao={abrirEdicao}
      />
      {alertaExcluir && <span className="alerta-msg erro">Contato excluído!</span>}
      {alertaEditar && <span className="alerta-msg sucesso">Contato editado!</span>}

      <EditContact
        contatoAtual={contatoAtual}
        setContatoAtual={setContatoAtual}
        editando={editando}
        setEditando={setEditando}
        setContatos={setContatos}
        formatTelefone={formatTelefone}
        onEditSave={handleEdicaoSalva} // <-- callback para acionar alerta
      />
    </section>
  );
}