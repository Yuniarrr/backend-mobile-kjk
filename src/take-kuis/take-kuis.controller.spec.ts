import { Test, TestingModule } from '@nestjs/testing';
import { TakeKuisController } from './take-kuis.controller';
import { TakeKuisService } from './take-kuis.service';

describe('TakeKuisController', () => {
  let controller: TakeKuisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TakeKuisController],
      providers: [TakeKuisService],
    }).compile();

    controller = module.get<TakeKuisController>(TakeKuisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
