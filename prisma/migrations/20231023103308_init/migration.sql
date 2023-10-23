-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Beginning', 'Intermediate', 'Advanced');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Not_Started', 'In_Progress', 'Completed');

-- CreateTable
CREATE TABLE "Kategori" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "level" "Level" NOT NULL DEFAULT 'Beginning',
    "kategori_id" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sub_Topic" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "topic_id" INTEGER NOT NULL,

    CONSTRAINT "Sub_Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sub_Sub_Topic" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "detail_content" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "image_link" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "sub_topic_id" INTEGER NOT NULL,

    CONSTRAINT "Sub_Sub_Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kuis" (
    "id" SERIAL NOT NULL,
    "soal" TEXT NOT NULL,
    "pilihan" TEXT[],
    "jawaban" TEXT NOT NULL,
    "topic_id" INTEGER NOT NULL,

    CONSTRAINT "Kuis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Take_Course" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Not_Started',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "Take_Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detail_Take_Course" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Not_Started',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "take_course_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "sub_topic_id" INTEGER NOT NULL,
    "sub_sub_topic_id" INTEGER NOT NULL,

    CONSTRAINT "Detail_Take_Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Take_Kuis" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Not_Started',
    "nilai" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Take_Kuis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detail_Take_Kuis" (
    "id" SERIAL NOT NULL,
    "jawaban" TEXT NOT NULL,
    "mark" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "kuis_id" INTEGER NOT NULL,

    CONSTRAINT "Detail_Take_Kuis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "Kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sub_Topic" ADD CONSTRAINT "Sub_Topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sub_Sub_Topic" ADD CONSTRAINT "Sub_Sub_Topic_sub_topic_id_fkey" FOREIGN KEY ("sub_topic_id") REFERENCES "Sub_Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kuis" ADD CONSTRAINT "Kuis_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Take_Course" ADD CONSTRAINT "Take_Course_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Take_Course" ADD CONSTRAINT "Take_Course_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_Take_Course" ADD CONSTRAINT "Detail_Take_Course_take_course_id_fkey" FOREIGN KEY ("take_course_id") REFERENCES "Take_Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_Take_Course" ADD CONSTRAINT "Detail_Take_Course_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_Take_Course" ADD CONSTRAINT "Detail_Take_Course_sub_topic_id_fkey" FOREIGN KEY ("sub_topic_id") REFERENCES "Sub_Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_Take_Course" ADD CONSTRAINT "Detail_Take_Course_sub_sub_topic_id_fkey" FOREIGN KEY ("sub_sub_topic_id") REFERENCES "Sub_Sub_Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Take_Kuis" ADD CONSTRAINT "Take_Kuis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_Take_Kuis" ADD CONSTRAINT "Detail_Take_Kuis_kuis_id_fkey" FOREIGN KEY ("kuis_id") REFERENCES "Kuis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
