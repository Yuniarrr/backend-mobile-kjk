import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { TakeCourseService } from './take-course.service';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorators';

@ApiTags('Take Course')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('take-course')
export class TakeCourseController {
  constructor(private readonly takeCourseService: TakeCourseService) {}

  @ApiOkResponse({
    description: 'Create course',
  })
  @Post(':id')
  async create(@GetUser('id') user_id: number, @Param('id') course_id: number) {
    try {
      const course = await this.takeCourseService.create(user_id, course_id);

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

      console.error('Error in create CourseController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Update status course',
  })
  @Patch(':id')
  async update(@Param('id') id: number) {
    try {
      const course = await this.takeCourseService.update(id);

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

      console.error('Error in update CourseController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Get all courses by user',
  })
  @Get()
  async findAll(@GetUser('id') user_id: number) {
    try {
      const courses = await this.takeCourseService.findAll(user_id);

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

  @ApiNoContentResponse({
    description: 'Delete course by id',
  })
  @ApiOkResponse({
    description: 'Delete course by id',
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      const course = this.takeCourseService.remove(id);

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

      console.error('Error in remove CourseController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }
}
