"use server";

import { prisma } from "@/lib/prisma";
import { setSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function createRequest(formData: FormData) {
  const siteName = formData.get("siteName") as string;
  const purpose = formData.get("purpose") as string;
  const contactName = formData.get("contactName") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!siteName || !purpose || !contactName || !phone || !email || !password) {
    return { error: "Preencha todos os campos." };
  }

  try {
    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } });
    
    if (user) {
      // Very basic validation - in a real scenario you'd verify the password here
      // But for the form flow, let's allow it if it matches or return error
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return { error: "E-mail já cadastrado com senha diferente. Por favor, faça login primeiro." };
      }
    } else {
      // Create user
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: contactName,
          phone,
          role: "CLIENT"
        }
      });
    }

    // Create the Request
    const request = await prisma.request.create({
      data: {
        siteName,
        purpose,
        contactName,
        phone,
        userId: user.id
      }
    });

    // Create initial automated message from Admin
    // First, find or create admin
    let admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (!admin) {
      // Gera uma senha aleatória extremamente segura para o Admin na primeira inicialização
      const { randomBytes } = await import("crypto");
      const secureRandomPassword = process.env.ADMIN_INITIAL_PASSWORD || randomBytes(16).toString("hex");
      const hashedAdminPassword = await bcrypt.hash(secureRandomPassword, 10);
      
      admin = await prisma.user.create({
        data: {
          email: "admin@nexsite.com",
          password: hashedAdminPassword,
          name: "Equipe NexSite",
          role: "ADMIN"
        }
      });
      
      console.log("=========================================");
      console.log("ATENÇÃO: Conta de Administrador criada!");
      console.log("Email: admin@nexsite.com");
      console.log("Senha Temporária:", secureRandomPassword);
      console.log("Guarde esta senha e troque-a depois.");
      console.log("=========================================");
    }

    const initialContent = `**Nova solicitação de site**\n\nNome do site: ${siteName}\nFinalidade: ${purpose}\nTelefone: ${phone}\nResponsável: ${contactName}\n\nOlá, ${contactName}! Como podemos ajudar com o seu projeto?`;

    await prisma.message.create({
      data: {
        content: initialContent,
        requestId: request.id,
        senderId: admin.id
      }
    });

    // Set auth cookie
    await setSession(user.id);

    return { redirectUrl: `/cliente/chat/${request.id}` };

  } catch (error) {
    console.error(error);
    return { error: "Ocorreu um erro no servidor." };
  }
}
