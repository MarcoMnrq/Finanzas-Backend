import { Test, TestingModule } from '@nestjs/testing';
import { LegalPersonsService } from './legal-persons.service';

describe('LegalPersonsService', () => {
  let service: LegalPersonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegalPersonsService],
    }).compile();

    service = module.get<LegalPersonsService>(LegalPersonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
