import { Test, TestingModule } from '@nestjs/testing';
import { TakeCourseService } from './take-course.service';

describe('TakeCourseService', () => {
  let service: TakeCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TakeCourseService],
    }).compile();

    service = module.get<TakeCourseService>(TakeCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
