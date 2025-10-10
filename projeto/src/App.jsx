import React, { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import GeradorLink from "./components/LinkGenerator";
import { supabase } from './supabaseClients';
import "./App.css";

export default function App() {
  return (
    <div>
      <header className="header">
        <h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#009912" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-circle-icon lucide-message-circle"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>
          <span className="brand">WhatsHub</span>
        </h1>
        <p>
          O jeito mais rápido de iniciar conversas no WhatsApp. Gere links
          instantâneos e mantenha seus contatos organizados.
        </p>
      </header>

      <div className="container">
        <GeradorLink/>
        <ContactForm />
      </div>
    </div>
  );
}
