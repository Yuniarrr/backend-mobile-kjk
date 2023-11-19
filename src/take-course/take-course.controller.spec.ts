import { Test, TestingModule } from '@nestjs/testing';
import { TakeCourseController } from './take-course.controller';
import { TakeCourseService } from './take-course.service';

describe('TakeCourseController', () => {
  let controller: TakeCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TakeCourseController],
      providers: [TakeCourseService],
    }).compile();

    controller = module.get<TakeCourseController>(TakeCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
