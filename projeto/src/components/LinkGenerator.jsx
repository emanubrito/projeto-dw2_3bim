import React, { useState, useEffect } from "react";

export default function GeradorLink({ numeroInicial = "" }) {
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [link, setLink] = useState("");
  const [copiado, setCopiado] = useState(false);

  // quando o número vindo da lista mudar, atualiza o campo automaticamente
  useEffect(() => {
    if (numeroInicial) setTelefone(numeroInicial);
  }, [numeroInicial]);


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
    navigator.clipboard.writeText(link).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000); // para sumir depois de 2s
    });
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
      <div className="input-with-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
          strokeLinecap="round" strokeLinejoin="round" 
          className="lucide lucide-phone">
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
        </svg>
        <input 
          type="text"
          value={telefone}
          onChange={handleTelefoneChange}
          placeholder="(44) 91234-1234"
        />
      </div>

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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        </button>
        {copiado && <span className="copiado-msg">Link copiado!</span>}
      </div>

      <button className="btn-green" onClick={abrirWhatsApp} disabled={!link}>
        Abrir WhatsApp
      </button>
    </section>
  );
}
