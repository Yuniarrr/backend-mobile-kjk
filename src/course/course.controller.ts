import {
  Controller,
  Get,
  UseGuards,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('Course')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOkResponse({
    description: 'Get all courses',
  })
  @Get()
  async findAll() {
    try {
      const courses = await this.courseService.findAll();

      return {
        status: 'success',
        data: courses,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          status: 'error',
          message: error.message,
        };
      }

      console.error('Error in findAll CourseController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Get topic by course',
  })
  @Get('topic/:course_id')
  async findTopicByCourse(@Param('course_id') course_id: number) {
    try {
      const course = await this.courseService.findTopicByCourse(course_id);

      return {
        status: 'success',
        data: course,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          status: 'error',
          message: error.message,
        };
      }

      console.error('Error in findAll CourseController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }
}
