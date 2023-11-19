-- DropForeignKey
ALTER TABLE "Detail_Take_Course" DROP CONSTRAINT "Detail_Take_Course_sub_sub_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "Detail_Take_Course" DROP CONSTRAINT "Detail_Take_Course_sub_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "Detail_Take_Course" DROP CONSTRAINT "Detail_Take_Course_take_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Detail_Take_Course" DROP CONSTRAINT "Detail_Take_Course_topic_id_fkey";

-- AlterTable
ALTER TABLE "Detail_Take_Course" ALTER COLUMN "take_course_id" DROP NOT NULL,
ALTER COLUMN "topic_id" DROP NOT NULL,
ALTER COLUMN "sub_topic_id" DROP NOT NULL,
ALTER COLUMN "sub_sub_topic_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Detail_Take_Course" ADD CONSTRAINT "Detail_Take_Course_take_course_id_fkey" FOREIGN KEY ("take_course_id") REFERENCES "Take_Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_Take_Course" ADD CONSTRAINT "Detail_Take_Course_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_Take_Course" ADD CONSTRAINT "Detail_Take_Course_sub_topic_id_fkey" FOREIGN KEY ("sub_topic_id") REFERENCES "Sub_Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_Take_Course" ADD CONSTRAINT "Detail_Take_Course_sub_sub_topic_id_fkey" FOREIGN KEY ("sub_sub_topic_id") REFERENCES "Sub_Sub_Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
