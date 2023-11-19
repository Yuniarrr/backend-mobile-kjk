import { Module } from '@nestjs/common';
import { TakeCourseService } from './take-course.service';
import { TakeCourseController } from './take-course.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [TakeCourseController],
  providers: [TakeCourseService, PrismaService],
})
export class TakeCourseModule {}
