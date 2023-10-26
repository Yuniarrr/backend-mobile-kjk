import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

export const sub_sub_topic = async () => {
  try {
    fs.readFile(
      __dirname + '/../data/sub_sub_topic_1.tsv',
      'utf8',
      async (err, data) => {
        console.log('Seed sub sub topic 1');
        const rows = data.split('\n');

        for (const row of rows) {
          if (row.startsWith('no') || row === '') {
            continue;
          }

          const [no, sub_topic, title, content, detail_content] =
            row.split('\t');
          const detailContentCleaned = detail_content.trim();
          //   const detail_content_stringfy = JSON.stringify(detailContentCleaned);
          //   const detail_content_json = JSON.parse(detail_content_stringfy);
          //   console.log('test ' + JSON.parse(detail_content_json) + ' test');

          const sub_sub_topic = await prisma.sub_Sub_Topic.findFirst({
            where: {
              id: parseInt(no),
            },
          });

          if (sub_sub_topic) {
            continue;
          }

          const foundSubTopic = await prisma.sub_Topic.findFirst({
            where: {
              title: sub_topic,
            },
          });

          if (foundSubTopic) {
            await prisma.sub_Sub_Topic.create({
              data: {
                id: parseInt(no),
                sub_topic_id: foundSubTopic.id,
                title: title,
                content: content,
                detail_content: detailContentCleaned
                  ? detailContentCleaned
                  : [],
              },
            });
          } else {
            console.error(`topic not found for: ${sub_topic} - ${title}`);
          }
        }
      },
    );

    fs.readFile(
      __dirname + '/../data/sub_sub_topic_2.tsv',
      'utf8',
      async (err, data) => {
        console.log('Seed sub sub topic 2');
        const rows = data.split('\n');

        for (const row of rows) {
          if (row.startsWith('no') || row === '') {
            continue;
          }

          const [
            no,
            sub_topic,
            title,
            content,
            detail_content,
            link_1,
            link_2,
            link_3,
            link_4,
            link_5,
            link_6,
            link_7,
            link_8,
            link_9,
            link_10,
            link_11,
            link_12,
            link_13,
            link_14,
            link_15,
            link_16,
            link_17,
            link_18,
            link_19,
            link_20,
          ] = row.split('\t');

          // console.log('no: ' + no);
          // console.log('sub_topic: ' + sub_topic);
          // console.log('title: ' + title);
          const detailContentCleaned = detail_content.trim();
          // console.log(detailContentCleaned);
          //   const detail_content_stringfy = JSON.stringify(detailContentCleaned);
          //   const detail_content_json = JSON.parse(detail_content_stringfy);
          //   console.log('test ' + JSON.parse(detail_content_json) + ' test');

          const sub_sub_topic = await prisma.sub_Sub_Topic.findFirst({
            where: {
              id: parseInt(no),
            },
          });

          if (sub_sub_topic) {
            continue;
          }

          const image_link = [
            link_1,
            link_2,
            link_3,
            link_4,
            link_5,
            link_6,
            link_7,
            link_8,
            link_9,
            link_10,
            link_11,
            link_12,
            link_13,
            link_14,
            link_15,
            link_16,
            link_17,
            link_18,
            link_19,
            link_20,
          ].filter(Boolean);

          const foundSubTopic = await prisma.sub_Topic.findFirst({
            where: {
              title: sub_topic,
            },
          });

          if (foundSubTopic) {
            await prisma.sub_Sub_Topic.create({
              data: {
                id: parseInt(no),
                sub_topic_id: foundSubTopic.id,
                title: title,
                content: content,
                detail_content: detailContentCleaned
                  ? detailContentCleaned
                  : [],
                image_link,
              },
            });
          } else {
            console.error(`topic not found for: ${sub_topic} - ${title}`);
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
