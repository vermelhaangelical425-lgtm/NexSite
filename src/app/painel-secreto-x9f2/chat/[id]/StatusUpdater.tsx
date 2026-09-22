"use client";

import { useState } from "react";
import { updateStatusAction } from "./actions";

export default function StatusUpdater({ requestId, currentStatus }: { requestId: string, currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  return (
    <form 
      action={async (formData) => {
        setLoading(true);
        await updateStatusAction(formData);
        setLoading(false);
      }} 
      className="flex flex-wrap items-center gap-2"
    >
      <input type="hidden" name="requestId" value={requestId} />
      <label className="text-sm font-medium text-gray-700">Status do Projeto:</label>
      <select 
        name="status" 
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 bg-white"
      >
        <option value="NEW">Nova solicitação</option>
        <option value="IN_PROGRESS">Em atendimento</option>
        <option value="QUOTE_SENT">Orçamento enviado</option>
        <option value="IN_DEVELOPMENT">Site em desenvolvimento</option>
        <option value="COMPLETED">Finalizado</option>
      </select>

      {status === "QUOTE_SENT" && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Valor:</span>
          <input 
            type="text" 
            name="price" 
            placeholder="Ex: R$ 997,00" 
            required
            className="w-32 border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-gray-900 bg-white"
          />
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-700 transition disabled:opacity-50"
      >
        {loading ? "..." : "Atualizar"}
      </button>
    </form>
  );
}
