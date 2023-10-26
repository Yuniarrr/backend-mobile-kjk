import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

export const soal = async () => {
  try {
    fs.readFile(
      __dirname + '/../data/soal_1.tsv',
      'utf8',
      async (err, data) => {
        console.log('Seed soal 1');
        const rows = data.split('\n');

        for (const row of rows) {
          if (row.startsWith('no') || row === '') {
            continue;
          }

          const [
            no,
            topic,
            soal,
            pilihan_1,
            pilihan_2,
            pilihan_3,
            pilihan_4,
            jawaban,
          ] = row.split('\t');
          const jawabanCleaned = jawaban.trim();

          const kuis = await prisma.kuis.findFirst({
            where: {
              id: parseInt(no),
            },
          });

          if (kuis) {
            continue;
          }

          const pilihan = [pilihan_1, pilihan_2, pilihan_3, pilihan_4].filter(
            Boolean,
          );

          const foundTopic = await prisma.topic.findFirst({
            where: {
              title: topic,
            },
          });

          if (foundTopic) {
            await prisma.kuis.create({
              data: {
                id: parseInt(no),
                topic_id: foundTopic.id,
                soal,
                jawaban: jawabanCleaned,
                pilihan,
              },
            });
          } else {
            console.error(`topic not found for: ${topic} - ${no}`);
          }
        }
      },
    );

    fs.readFile(
      __dirname + '/../data/soal_2.tsv',
      'utf8',
      async (err, data) => {
        console.log('Seed soal 2');
        const rows = data.split('\n');

        for (const row of rows) {
          if (row.startsWith('no') || row === '') {
            continue;
          }

          const [
            no,
            topic,
            soal,
            pilihan_1,
            pilihan_2,
            pilihan_3,
            pilihan_4,
            jawaban,
          ] = row.split('\t');
          const jawabanCleaned = jawaban.trim();

          const kuis = await prisma.kuis.findFirst({
            where: {
              id: parseInt(no),
            },
          });

          if (kuis) {
            continue;
          }

          const pilihan = [pilihan_1, pilihan_2, pilihan_3, pilihan_4].filter(
            Boolean,
          );

          const foundTopic = await prisma.topic.findFirst({
            where: {
              title: topic,
            },
          });

          if (foundTopic) {
            await prisma.kuis.create({
              data: {
                id: parseInt(no),
                topic_id: foundTopic.id,
                soal,
                jawaban: jawabanCleaned,
                pilihan,
              },
            });
          } else {
            console.error(`topic not found for: ${topic} - ${no}`);
          }
        }
      },
    );
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
