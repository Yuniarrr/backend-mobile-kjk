import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export async function kategori() {
export const kategori = async () => {
  console.log('Seed kategori');

  await prisma.kategori.createMany({
    data: [
      {
        nama: 'Cybersecurity',
      },
      {
        nama: 'OS & IT',
      },
      {
        nama: 'Networking',
      },
    ],
  });
};
