import React, { useState, useEffect } from "react";
import ContatoList from "./ContactItem";
import GeradorLink from "./LinkGenerator";
import { supabase } from "../supabaseClients";

export default function ContactList({ numeroSelecionado, setNumeroSelecionado }) {
  const [contatos, setContatos] = useState([]);

  // Buscar contatos do Supabase
  useEffect(() => {
    fetchContatos();
  }, []);
 
    const fetchContatos = async () => {
      const { data, error } = await supabase.from("contatos").select("*");
      if (error) {
        console.error("Erro ao buscar contatos:", error);
      } else {
        setContatos(data);
      }
    };


  const removerContato = async (id) => {
    const { error } = await supabase.from("contatos").delete().eq("id", id);
    if (error) {
      console.error("Erro ao remover contato:", error);
    } else {
      setContatos(contatos.filter((c) => c.id !== id));
    }
  };

  const abrirEdicao = (contato) => {
    console.log("Editar contato:", contato);
    // aqui você pode abrir um modal ou passar os dados pro ContactForm
  };

  const abrirMensagem = (telefone) => {
    setNumeroSelecionado(telefone);
  };

  return (
    <div>
      <ContatoList
        contatos={contatos}
        removerContato={removerContato}
        abrirEdicao={abrirEdicao}
        abrirMensagem={abrirMensagem}
      />

      <GeradorLink numeroInicial={numeroSelecionado} />
    </div>
  );
}
