import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ChatRoom from "@/components/chat/ChatRoom";
import { notFound, redirect } from "next/navigation";
import StatusUpdater from "./StatusUpdater";

export default async function AdminChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const request = await prisma.request.findUnique({
    where: { id: id },
    include: { user: true }
  });

  if (!request) return notFound();

  return (
    <div className="flex flex-col h-full bg-gray-50 p-6">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{request.siteName}</h1>
          <p className="text-gray-500">Cliente: {request.contactName} ({request.phone})</p>
        </div>
        
        <StatusUpdater requestId={id} currentStatus={request.status} />
      </div>
      <div className="flex-1 bg-white shadow rounded-lg overflow-hidden h-[calc(100vh-220px)] min-h-[400px] flex flex-col">
        <ChatRoom requestId={request.id} currentUserId={session.id} isAdmin={true} />
      </div>
    </div>
  );
}
