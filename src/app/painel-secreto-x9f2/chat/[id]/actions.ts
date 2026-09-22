"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateStatusAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return;

  const requestId = formData.get("requestId") as string;
  const newStatus = formData.get("status") as string;
  const price = formData.get("price") as string;

  const request = await prisma.request.findUnique({ where: { id: requestId } });
  if (!request) return;

  const oldStatus = request.status;

  if (oldStatus !== newStatus) {
    await prisma.request.update({
      where: { id: requestId },
      data: { status: newStatus }
    });

    let autoMsg = "";
    if (newStatus === "QUOTE_SENT") {
      autoMsg = `Seu orçamento foi analisado e o valor do projeto ficou em ${price}! O pagamento para iniciar deve ser feito via PIX na chave CPF: 05072060373. Por favor, assim que realizar o pagamento, anexe o comprovante aqui no chat para confirmarmos.`;
    } else if (newStatus === "IN_DEVELOPMENT") {
      autoMsg = "Pagamento confirmado! O seu site já está sendo desenvolvido pela nossa equipe.";
    } else if (newStatus === "COMPLETED") {
      autoMsg = "Projeto finalizado com sucesso! Foi um prazer trabalhar com você. O chat deste projeto agora está encerrado.";
    }

    if (autoMsg) {
      await prisma.message.create({
        data: {
          content: autoMsg,
          requestId: requestId,
          senderId: session.id
        }
      });
    }
    
    revalidatePath(`/painel-secreto-x9f2/chat/${requestId}`);
  }
}
