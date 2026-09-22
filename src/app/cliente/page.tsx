import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ClienteDashboard() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const requests = await prisma.request.findMany({
    where: { userId: session.id },
    include: {
      _count: {
        select: {
          messages: {
            where: { isRead: false, senderId: { not: session.id } }
          }
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-24 pb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Projetos</h1>
        <p className="text-gray-500 mb-8">Acompanhe o andamento dos seus sites e converse conosco.</p>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {requests.map((request) => (
              <li key={request.id}>
                <Link href={`/cliente/chat/${request.id}`} className="block hover:bg-gray-50 transition p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-blue-600 mb-1">{request.siteName}</h2>
                      <p className="text-sm text-gray-500">
                        Finalidade: {request.purpose} • Criado em {new Date(request.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${request.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          Status: {
                            {
                              'NEW': 'Nova solicitação',
                              'IN_PROGRESS': 'Em atendimento',
                              'QUOTE_SENT': 'Orçamento enviado',
                              'IN_DEVELOPMENT': 'Site em desenvolvimento',
                              'COMPLETED': 'Finalizado'
                            }[request.status] || request.status
                          }
                        </span>
                        
                        <div className="flex items-center gap-2 text-gray-400">
                          {request._count.messages > 0 && (
                            <span className="flex items-center justify-center bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              {request._count.messages} nova(s)
                            </span>
                          )}
                          <MessageCircle className="h-5 w-5" />
                          <span className="text-sm">Abrir Chat</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
            {requests.length === 0 && (
              <li className="px-4 py-8 text-center text-gray-500">
                Você ainda não solicitou nenhum site.
                <div className="mt-4">
                  <Link href="/solicitar" className="text-blue-600 hover:underline font-medium">Solicitar meu primeiro site</Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
