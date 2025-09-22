import React, { useState } from "react";

export default function GeradorLink() {
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [link, setLink] = useState("");

  const gerarLink = () => {
    if (!telefone) return;

    // ----- Só aceita dígito -----
    const numeroLimpo = telefone.replace(/\D/g, ""); 
    const numeroCompleto = numeroLimpo.startsWith("55")
      ? numeroLimpo
      : "55" + numeroLimpo;

    const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : "";
    setLink(`https://wa.me/${numeroCompleto}${texto}`);
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(link);
  };

  const abrirWhatsApp = () => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <section className="card">
      <h2>Gerador de Links</h2>

      <label>Número do WhatsApp</label>
      <input
        type="text"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        placeholder="(44) 91234-1234"
      />

      <label>Mensagem (opcional)</label>
      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Digite sua mensagem aqui..."
      ></textarea>

      <button onClick={gerarLink}>
        Preparar Mensagem
      </button>

      <label>Link gerado:</label>
      <div className="link-box">
        <input type="text" readOnly value={link} />
        <button onClick={copiarLink}>
          copiar
        </button>
      </div>

      <button
        onClick={abrirWhatsApp}
        disabled={!link}
      >
        Abrir WhatsApp
      </button>
    </section>
  );
}
