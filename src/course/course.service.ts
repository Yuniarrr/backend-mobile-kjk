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
}
