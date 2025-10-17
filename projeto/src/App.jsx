import React from "react";
import ContactForm from "./components/contacts/ContactForm";
import GeradorLink from "./components/link/LinkGenerator";
import Header from "./components/header/header";
import "./App.css";

export default function App() {
  return (
    <div>
      <Header/>

      <div className="container">
        <GeradorLink/>
        <ContactForm />
      </div>
    </div>
  );
}
