import { Test, TestingModule } from '@nestjs/testing';
//import { LegalPersonsController } from './legal-persons.controller';
import { LegalPersonsService } from './legal-persons.service';

describe('LegalPersonsController', () => {
  //let controller: LegalPersonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //controllers: [LegalPersonsController],
      providers: [LegalPersonsService],
    }).compile();

    //controller = module.get<LegalPersonsController>(LegalPersonsController);
  });

  it('should be defined', () => {
    //expect(controller).toBeDefined();
  });
});
