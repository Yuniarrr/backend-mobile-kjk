import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TakeCourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user_id: number, course_id: number) {
    const course = await this.prisma.take_Course.create({
      data: {
        user_id,
        course_id,
        status: 'In_Progress',
      },
    });

    return course;
  }

  async update(id: number) {
    const course = await this.prisma.take_Course.update({
      where: {
        id,
      },
      data: {
        status: 'Completed',
      },
    });

    return course;
  }

  async findAll(user_id: number) {
    const courses = this.prisma.course.findMany({
      where: {
        Take_Course: {
          some: {
            user_id,
          },
        },
      },
    });

    return courses;
  }

  remove(id: number) {
    const course = this.prisma.take_Course.delete({
      where: {
        id,
      },
      include: {
        Detail_Take_Course: true,
      },
    });

    return course;
  }
}
