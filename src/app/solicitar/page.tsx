"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { createRequest } from "./actions";

export default function SolicitarPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await createRequest(formData);
      if (res.error) {
        setError(res.error);
        setLoading(false);
      } else if (res.redirectUrl) {
        window.location.href = res.redirectUrl;
      }
    } catch (err) {
      setError("Erro ao enviar solicitação.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-12 max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Adquirir meu site</h1>
          <p className="text-gray-500 mb-8">Preencha os dados abaixo e entraremos em contato com você em tempo real.</p>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do site</label>
                <input 
                  name="siteName" 
                  required 
                  placeholder="ex: Supermercado São José"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Para que será o site?</label>
                <input 
                  name="purpose" 
                  required 
                  placeholder="ex: Supermercado, Loja de roupas"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do responsável</label>
                <input 
                  name="contactName" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de telefone / WhatsApp</label>
                <input 
                  name="phone" 
                  required 
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                />
              </div>
            </div>

            <hr className="my-6" />
            <h3 className="text-lg font-medium text-gray-900">Crie sua conta para acompanhar</h3>
            <p className="text-sm text-gray-500 mb-4">Você precisará desses dados para acessar o andamento do projeto e falar no chat.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu E-mail</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crie uma senha</label>
                <input 
                  name="password" 
                  type="password" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Processando..." : "Enviar solicitação"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
