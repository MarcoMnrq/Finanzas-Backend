import { Module } from '@nestjs/common';
import { LegalPersonsService } from './legal-persons.service';
import { LegalPersonsController } from './legal-persons.controller';

@Module({
  controllers: [LegalPersonsController],
  providers: [LegalPersonsService]
})
export class LegalPersonsModule {}
