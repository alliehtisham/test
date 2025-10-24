import { Test, TestingModule } from '@nestjs/testing';
import { ConvertorService } from './convertor.service';

describe('CurrencyService', () => {
  let service: ConvertorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvertorService],
    }).compile();

    service = module.get<ConvertorService>(ConvertorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
