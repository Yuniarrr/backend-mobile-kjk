import { Test, TestingModule } from '@nestjs/testing';
import { TakeKuisService } from './take-kuis.service';

describe('TakeKuisService', () => {
  let service: TakeKuisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TakeKuisService],
    }).compile();

    service = module.get<TakeKuisService>(TakeKuisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
