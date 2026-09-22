"use client";

import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { Send, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ChatRoom({ requestId, currentUserId, isAdmin }: { requestId: string, currentUserId: string, isAdmin: boolean }) {
  const { data, error, mutate } = useSWR(`/api/chat/${requestId}`, fetcher, { refreshInterval: 3000 });
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setSending(true);
    try {
      await fetch(`/api/chat/${requestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message })
      });
      setMessage("");
      mutate();
    } finally {
      setSending(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSending(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await res.json();

      if (uploadData.url) {
        // Envia a URL da imagem como uma mensagem markdown-like
        await fetch(`/api/chat/${requestId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: `![Imagem](${uploadData.url})` })
        });
        mutate();
      }
    } catch (err) {
      alert("Erro ao enviar a imagem.");
    } finally {
      setSending(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (error) return <div>Erro ao carregar o chat.</div>;
  if (!data) return <div>Carregando chat...</div>;

  const isClosed = data.status === 'COMPLETED';

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {data.messages?.map((msg: any) => {
          const isMe = msg.senderId === currentUserId;
          const isImage = msg.content.startsWith("![Imagem](") && msg.content.endsWith(")");
          const imageUrl = isImage ? msg.content.match(/\((.*?)\)/)?.[1] : null;

          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className="text-xs text-gray-500 mb-1 ml-1">
                {msg.sender.name} {isAdmin && isMe ? "(Admin)" : ""}
              </div>
              <div 
                className={`max-w-[80%] md:max-w-[70%] px-4 py-2 rounded-2xl whitespace-pre-wrap ${
                  isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }`}
              >
                {isImage ? (
                  <a href={imageUrl} target="_blank" rel="noreferrer">
                    <img src={imageUrl} alt="Anexo" className="max-w-full h-auto rounded-lg mt-1 mb-1 object-cover max-h-64 cursor-pointer hover:opacity-90 transition" />
                  </a>
                ) : (
                  msg.content
                )}
              </div>
              <div className="text-[10px] text-gray-400 mt-1">
                {format(new Date(msg.createdAt), "HH:mm")}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <form onSubmit={sendMessage} className="flex gap-2 items-center">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={sending || isClosed}
            className="text-gray-500 p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 transition"
            title="Anexar Imagem"
          >
            <ImageIcon className="h-6 w-6" />
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isClosed ? "Este chat foi encerrado." : "Digite sua mensagem..."}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={sending || isClosed}
          />
          <button 
            type="submit" 
            disabled={sending || !message.trim() || isClosed}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 transition"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
