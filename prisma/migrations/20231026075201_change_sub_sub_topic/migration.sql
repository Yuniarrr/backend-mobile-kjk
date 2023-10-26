/*
  Warnings:

  - Changed the type of `detail_content` on the `Sub_Sub_Topic` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Sub_Sub_Topic" DROP COLUMN "detail_content",
ADD COLUMN     "detail_content" JSONB NOT NULL;
