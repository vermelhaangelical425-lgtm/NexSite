"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await loginAction(formData);
      if (res.error) {
        setError(res.error);
        setLoading(false);
      } else if (res.redirectUrl) {
        window.location.href = res.redirectUrl;
      }
    } catch (err) {
      setError("Erro de servidor.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-32 pb-12 max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Acessar minha conta</h1>
          
          {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input name="email" type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input name="password" type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition">
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
