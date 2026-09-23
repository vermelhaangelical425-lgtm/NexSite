import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  
  const novaSenha = 'admin'; // Senha que queremos definir
  const hashed = await bcrypt.hash(novaSenha, 10);
  
  if (admin) {
    await prisma.user.update({
      where: { id: admin.id },
      data: { password: hashed }
    });
    console.log('Senha do admin ATUALIZADA com sucesso para: ' + novaSenha);
  } else {
    await prisma.user.create({
      data: {
        email: 'admin@nexsite.com',
        name: 'Equipe NexSite',
        role: 'ADMIN',
        password: hashed
      }
    });
    console.log('Admin CRIADO com sucesso! Senha: ' + novaSenha);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
