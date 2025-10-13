import React from "react";
import "../styles/FiltroCategoria.css"

export default function FiltroCategoria({ categoriaSelecionada, setCategoriaSelecionada }) {
  const categorias = ["Geral", "Família", "Trabalho", "Amigos", "Escola"];

  return (
    <div className="filtro-categorias">
      {categorias.map((cat) => (
        <button
          key={cat}
          className={`btn-categoria ${categoriaSelecionada === cat ? "ativa" : ""}`}
          onClick={() => setCategoriaSelecionada(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
