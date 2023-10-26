import { PrismaClient } from '@prisma/client';
import { promises as fsPromises } from 'fs';

const prisma = new PrismaClient();

export const sub_topic = async () => {
  try {
    const data = await fsPromises.readFile(
      __dirname + '/../data/sub_topic.tsv',
      'utf8',
    );
    console.log('Seed sub topic');
    const rows = data.split('\n');

    for (const row of rows) {
      if (row.startsWith('no') || row === '') {
        continue;
      }

      const [no, topic, title] = row.split('\t');
      const titleCleaned = title.trim();

      const sub_topic = await prisma.sub_Topic.findFirst({
        where: {
          id: parseInt(no),
        },
      });

      if (sub_topic) {
        continue;
      }

      const foundTopic = await prisma.topic.findFirst({
        where: {
          title: topic,
        },
      });

      if (foundTopic) {
        await prisma.sub_Topic.create({
          data: {
            id: parseInt(no),
            title: titleCleaned,
            topic_id: foundTopic.id,
          },
        });
      } else {
        console.error(`topic not found for: ${topic} - ${titleCleaned}`);
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
