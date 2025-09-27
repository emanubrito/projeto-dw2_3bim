import React, { useEffect } from "react";
import ContactForm from "./components/ContactForm";
import LinkGenerator from "./components/LinkGenerator";
import "./App.css";

export default function App() {
  return (
    <div>
      <header className="header">
        <h1>
          <span className="logo">💬</span>{" "}
          <span className="brand">WhatsHub</span>
        </h1>
        <p>
          O jeito mais rápido de iniciar conversas no WhatsApp. Gere links
          instantâneos e mantenha seus contatos organizados.
        </p>
      </header>

      <div className="container">
        <LinkGenerator />
        <ContactForm />
      </div>
    </div>
  );
}
