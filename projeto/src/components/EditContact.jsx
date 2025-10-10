import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClients";
import "../styles/EditContact.css"

export default function EditContact({
  contatoAtual,
  setContatoAtual,
  editando,
  setEditando,
  setContatos,
  formatTelefone,
}) {
  const [editNome, setEditNome] = useState("");
  const [editNumero, setEditNumero] = useState("");

  // sempre que o contatoAtual mudar, preencher os campos
  useEffect(() => {
    if (contatoAtual) {
      setEditNome(contatoAtual.nome || "");
      setEditNumero(contatoAtual.telefone || "");
    }
  }, [contatoAtual]);

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
