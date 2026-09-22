import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getSession } from "@/lib/auth";

export default async function AdminDashboard() {
  const session = await getSession();
  
  const requests = await prisma.request.findMany({
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      },
      _count: {
        select: {
          messages: {
            where: {
              isRead: false,
              senderId: { not: session?.id }
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Solicitações de Sites</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {requests.map((request) => (
            <li key={request.id}>
              <Link href={`/painel-secreto-x9f2/chat/${request.id}`} className="block hover:bg-gray-50 transition">
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-blue-600 truncate">{request.siteName}</p>
                    <p className="text-sm text-gray-500">{request.contactName} • {request.purpose}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${request.status === 'NEW' ? 'bg-green-100 text-green-800' : 
                        request.status === 'COMPLETED' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
                      {
                        {
                          'NEW': 'Nova solicitação',
                          'IN_PROGRESS': 'Em atendimento',
                          'QUOTE_SENT': 'Orçamento enviado',
                          'IN_DEVELOPMENT': 'Site em desenvolvimento',
                          'COMPLETED': 'Finalizado'
                        }[request.status] || request.status
                      }
                    </span>

                    {request._count.messages > 0 && (
                      <span className="flex items-center justify-center bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full">
                        {request._count.messages}
                      </span>
                    )}

                    <MessageCircle className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
          {requests.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">Nenhuma solicitação encontrada.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
