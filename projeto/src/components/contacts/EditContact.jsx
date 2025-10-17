import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClients";
import "../../styles/EditContact.css";

export default function EditContact({
  contatoAtual,
  setContatoAtual,
  editando,
  setEditando,
  setContatos,
  formatTelefone,
  onEditSave,
}) {
  const [editNome, setEditNome] = useState("");
  const [editNumero, setEditNumero] = useState("");
  const [editCategoria, setEditCategoria] = useState(""); // novo estado

  // sempre que o contatoAtual mudar, preencher os campos
  useEffect(() => {
    if (contatoAtual) {
      setEditNome(contatoAtual.nome || "");
      setEditNumero(contatoAtual.telefone || "");
      setEditCategoria(contatoAtual.categoria || ""); // preencher categoria
    }
  }, [contatoAtual]);

  const cancelarEdicao = () => {
    setEditando(false);
    setContatoAtual(null);
    setEditNome("");
    setEditNumero("");
    setEditCategoria("");
  };

  const salvarEdicao = async () => {
    if (!contatoAtual) return;
    if (!editNome.trim() || !editNumero.trim() || !editCategoria.trim()) return;

    // Atualiza no banco Supabase
    const { error } = await supabase
      .from("contatos")
      .update({
        nome: editNome.trim(),
        telefone: editNumero.trim(),
        categoria: editCategoria,
      })
      .eq("id", contatoAtual.id);

    if (error) {
      console.error("Erro ao editar contato:", error);
      return;
    }

    // Atualiza a lista localmente
    setContatos((prev) =>
      prev.map((c) =>
        c.id === contatoAtual.id
          ? {
              ...c,
              nome: editNome.trim(),
              telefone: editNumero.trim(),
              categoria: editCategoria,
            }
          : c
      )
    );

    cancelarEdicao();

    if (onEditSave) onEditSave(); // aciona o alerta no ContactForm
  };

  if (!editando) return null; // só aparece se estiver editando

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal-content">
        <h3 className="com-icone">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00b303"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
          </svg>
          Editar Contato
        </h3>

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
          onChange={(e) => setEditNumero(formatTelefone(e.target.value))}
        />

        {/* 🔹 Campo de categoria */}
        <select
          value={editCategoria}
          onChange={(e) => setEditCategoria(e.target.value)}
        >
          <option value="">Geral</option>
          <option value="Família">Família</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Amigos">Amigos</option>
          <option value="Escola">Escola</option>
        </select>

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
  );
}
