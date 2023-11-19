import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const courses = await this.prisma.course.findMany();

    return courses;
  }

  async findTopicByCourse(course_id: number) {
    const course = await this.prisma.topic.findMany({
      where: {
        course_id,
      },
    });

    return course;
  }

  async findSubTopicByTopic(topic_id: number) {
    const subTopic = await this.prisma.sub_Topic.findMany({
      where: {
        topic_id,
      },
    });

    return subTopic;
  }

  async findSubSubTopicBySubTopic(sub_topic_id: number) {
    const subSubTopic = await this.prisma.sub_Sub_Topic.findMany({
      where: {
        sub_topic_id,
      },
    });

    return subSubTopic;
  }
}
