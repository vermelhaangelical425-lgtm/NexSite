"use server";

import { prisma } from "@/lib/prisma";
import { setSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Preencha todos os campos." };

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "Credenciais inválidas." };

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { error: "Credenciais inválidas." };

    await setSession(user.id);

    if (user.role === "ADMIN") {
      return { redirectUrl: "/painel-secreto-x9f2" };
    }

    const lastRequest = await prisma.request.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" }
    });

    if (lastRequest) {
      return { redirectUrl: `/cliente/chat/${lastRequest.id}` };
    }

    return { redirectUrl: "/" }; // Fallback

  } catch (err) {
    return { error: "Ocorreu um erro no servidor." };
  }
}
