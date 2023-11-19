/*
  Warnings:

  - Added the required column `tgl_pengerjaan` to the `Take_Kuis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic_id` to the `Take_Kuis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Take_Kuis" ADD COLUMN     "tgl_pengerjaan" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "topic_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Take_Kuis" ADD CONSTRAINT "Take_Kuis_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
