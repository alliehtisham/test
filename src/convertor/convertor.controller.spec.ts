import { Test, TestingModule } from '@nestjs/testing';
import { ConvertorController } from './convertor.controller';

describe('CurrencyController', () => {
  let controller: ConvertorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConvertorController],
    }).compile();

    controller = module.get<ConvertorController>(ConvertorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
