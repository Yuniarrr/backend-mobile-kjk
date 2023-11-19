/*
  Warnings:

  - Added the required column `take_kuis_id` to the `Detail_Take_Kuis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Detail_Take_Kuis" ADD COLUMN     "take_kuis_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Detail_Take_Kuis" ADD CONSTRAINT "Detail_Take_Kuis_take_kuis_id_fkey" FOREIGN KEY ("take_kuis_id") REFERENCES "Take_Kuis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
