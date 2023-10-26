import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { course } from './seed/course';
import { kategori } from './seed/kategori';
import { topic } from './seed/topic';
import { sub_topic } from './seed/sub_topic';
import { sub_sub_topic } from './seed/sub_sub_topic';
import { soal } from './seed/soal';

async function main() {
  console.log('Start seeding KJK');
  try {
    await prisma.kuis.deleteMany();
    await prisma.sub_Sub_Topic.deleteMany();
    await prisma.sub_Topic.deleteMany();
    await prisma.topic.deleteMany();
    await prisma.course.deleteMany();
    await prisma.kategori.deleteMany();

    await kategori();
    await course();
    await topic();
    await sub_topic();
    await sub_sub_topic();
    await soal();
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
