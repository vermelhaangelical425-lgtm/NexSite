import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: Promise<{ requestId: string }> }) {
  const { requestId } = await params;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const req = await prisma.request.findUnique({
    where: { id: requestId },
    include: {
      user: true,
      messages: {
        include: { sender: true },
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!req) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (session.role !== 'ADMIN' && req.userId !== session.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await prisma.message.updateMany({
    where: {
      requestId: requestId,
      senderId: { not: session.id },
      isRead: false
    },
    data: { isRead: true }
  });

  return NextResponse.json({ messages: req.messages, status: req.status });
}

export async function POST(request: Request, { params }: { params: Promise<{ requestId: string }> }) {
  const { requestId } = await params;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { content } = await request.json();

  const req = await prisma.request.findUnique({ where: { id: requestId } });
  if (!req) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (session.role !== 'ADMIN' && req.userId !== session.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Verifica se está finalizado
  if (req.status === 'COMPLETED') {
    return NextResponse.json({ error: 'Chat finalizado' }, { status: 403 });
  }

  // Auto set IN_PROGRESS se Admin mandar mensagem num request NEW
  if (session.role === 'ADMIN' && req.status === 'NEW') {
    await prisma.request.update({
      where: { id: requestId },
      data: { status: 'IN_PROGRESS' }
    });
  }

  const message = await prisma.message.create({
    data: {
      content,
      requestId: requestId,
      senderId: session.id
    },
    include: { sender: true }
  });

  // --- LÓGICA DE RESPOSTAS AUTOMÁTICAS ---
  if (session.role === 'CLIENT') {
    const lowerContent = content.toLowerCase();
    let autoReply = "";

    if (lowerContent.includes("preço") || lowerContent.includes("valor") || lowerContent.includes("quanto custa")) {
      autoReply = "Nossos sites personalizados variam de acordo com as funcionalidades (e-commerce, sistemas, etc). Normalmente os projetos iniciais começam em R$ 997,00. Pode me contar mais sobre o que você precisa na sua página?";
    } else if (lowerContent.includes("prazo") || lowerContent.includes("tempo") || lowerContent.includes("demora")) {
      autoReply = "O prazo médio de entrega de um site institucional é de 5 a 10 dias úteis após a aprovação do design. Lojas virtuais podem levar até 15 dias úteis. Tem alguma data específica em mente?";
    } else if (lowerContent.includes("hospedagem") || lowerContent.includes("domínio") || lowerContent.includes("dominio")) {
      autoReply = "Nós te ajudamos com toda a configuração de hospedagem e registro de domínio (.com.br)! Se você já tiver um, podemos apenas conectar ao novo site.";
    } else if (lowerContent.includes("suporte") || lowerContent.includes("ajuda")) {
      autoReply = "Nosso suporte é feito diretamente por aqui! Após o site ser entregue, você tem 30 dias de suporte técnico gratuito para dúvidas e ajustes menores.";
    }

    if (autoReply) {
      // Find Admin user
      const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
      if (admin) {
        await prisma.message.create({
          data: {
            content: autoReply,
            requestId: requestId,
            senderId: admin.id
          }
        });
      }
    }
  }

  return NextResponse.json({ message });
}
