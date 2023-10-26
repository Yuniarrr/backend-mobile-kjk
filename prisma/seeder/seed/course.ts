import { Level, PrismaClient } from '@prisma/client';
import { promises as fsPromises } from 'fs';

const prisma = new PrismaClient();

const levelMap = {
  Beginning: 'Beginning',
  Intermediate: 'Intermediate',
  Advanced: 'Advanced',
};

export const course = async () => {
  try {
    const data = await fsPromises.readFile(
      __dirname + '/../data/course.csv',
      'utf8',
    );
    console.log('Seed course');
    const rows = data.split('\n');

    for (const row of rows) {
      if (row.startsWith('no') || row === '') {
        continue;
      }

      const [no, materi, levelStr, kategori] = row.split(',');
      const level = levelMap[levelStr] as Level;
      const kategoriCleaned = kategori.trim();

      const course = await prisma.course.findFirst({
        where: {
          id: parseInt(no),
        },
      });

      if (course) {
        continue;
      }

      const foundKategori = await prisma.kategori.findFirst({
        where: {
          nama: kategoriCleaned,
        },
      });

      if (foundKategori) {
        await prisma.course.create({
          data: {
            id: parseInt(no),
            nama: materi,
            level: level,
            kategori_id: foundKategori.id,
          },
        });
      } else {
        console.error(`Kategori not found for: ${kategori}`);
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
