import { Module } from '@nestjs/common';
import { NaturalPersonsService } from './natural-persons.service';
import { NaturalPersonsController } from './natural-persons.controller';

@Module({
  controllers: [NaturalPersonsController],
  providers: [NaturalPersonsService]
})
export class NaturalPersonsModule {}
