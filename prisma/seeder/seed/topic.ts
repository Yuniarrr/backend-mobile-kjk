import { PrismaClient } from '@prisma/client';
import { promises as fsPromises } from 'fs';

const prisma = new PrismaClient();

export const topic = async () => {
  try {
    const data = await fsPromises.readFile(
      __dirname + '/../data/topic.tsv',
      'utf8',
    );
    console.log('Seed topic');
    const rows = data.split('\n');

    for (const row of rows) {
      if (row.startsWith('no') || row === '') {
        continue;
      }

      const [no, course, title] = row.split('\t');
      const titleCleaned = title.trim();

      const topic = await prisma.topic.findFirst({
        where: {
          id: parseInt(no),
        },
      });

      if (topic) {
        continue;
      }

      const foundCourse = await prisma.course.findFirst({
        where: {
          nama: course,
        },
      });

      if (foundCourse) {
        await prisma.topic.create({
          data: {
            id: parseInt(no),
            title: titleCleaned,
            course_id: foundCourse.id,
          },
        });
      } else {
        console.error(`course not found for: ${course}`);
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
