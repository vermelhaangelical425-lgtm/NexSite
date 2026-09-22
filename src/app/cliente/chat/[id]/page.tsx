import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ChatRoom from "@/components/chat/ChatRoom";
import Navigation from "@/components/Navigation";
import { notFound, redirect } from "next/navigation";

export default async function ClientChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const request = await prisma.request.findUnique({
    where: { id: id },
    include: { user: true }
  });

  if (!request) return notFound();

  // Verifica se o usuário logado é o dono desta solicitação
  if (request.userId !== session.id) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-24 pb-8 flex flex-col">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projeto: {request.siteName}</h1>
            <p className="text-gray-500">Status: {
              {
                'NEW': 'Nova solicitação',
                'IN_PROGRESS': 'Em atendimento',
                'QUOTE_SENT': 'Orçamento enviado',
                'IN_DEVELOPMENT': 'Site em desenvolvimento',
                'COMPLETED': 'Finalizado'
              }[request.status] || request.status
            }</p>
          </div>
        </div>
        
        <div className="flex-1 bg-white shadow rounded-lg overflow-hidden h-[70vh] min-h-[400px] max-h-[800px] flex flex-col">
          <ChatRoom requestId={request.id} currentUserId={session.id} isAdmin={false} />
        </div>
      </main>
    </div>
  );
}
