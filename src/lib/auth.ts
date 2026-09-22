import { cookies } from 'next/headers';
import { prisma } from './prisma';

export async function getSession() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true }
    });
    return user;
  } catch (e) {
    return null;
  }
}

export async function setSession(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set('userId', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('userId');
}
