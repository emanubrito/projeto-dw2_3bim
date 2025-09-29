import React, { useState } from "react";

export default function GeradorLink() {
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [link, setLink] = useState("");

  // mascara que formata o número enquanto o usuário digita
  const handleTelefoneChange = (e) => {
    let raw = e.target.value.replace(/\D/g, "");
    raw = raw.slice(0, 11);
  
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
  
    setTelefone(formatted);
  };
  

  const gerarLink = () => {
    if (!telefone) return;

    // remove tudo que não for dígito para gerar o link
    const numeroLimpo = telefone.replace(/\D/g, "");
    const numeroCompleto = numeroLimpo.startsWith("55")
      ? numeroLimpo
      : "55" + numeroLimpo;

    const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : "";
    setLink(`https://wa.me/${numeroCompleto}${texto}`);
  };

  const copiarLink = () => {
    if (!link) return;
    navigator.clipboard.writeText(link);
  };

  const abrirWhatsApp = () => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <section className="card">
      <h2><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#009912" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-icon lucide-message-circle"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>
      </svg>  Gerador de Links</h2>

      <label>Número do WhatsApp</label>
      <input
        type="text"
        value={telefone}
        onChange={handleTelefoneChange}
        placeholder="(44) 91234-1234"
      />

      <label>Mensagem (opcional)</label>
      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Digite sua mensagem aqui..."
      ></textarea>

      <button className="btn-green" onClick={gerarLink}>
        Preparar Mensagem
      </button>

      <label>Link gerado:</label>
      <div className="link-box">
        <input type="text" readOnly value={link} />
        <button className="" onClick={copiarLink}>
          copiar
        </button>
      </div>

      <button className="btn-green" onClick={abrirWhatsApp} disabled={!link}>
        Abrir WhatsApp
      </button>
    </section>
  );
}
