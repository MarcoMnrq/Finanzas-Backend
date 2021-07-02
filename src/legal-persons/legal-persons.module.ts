import { Module } from '@nestjs/common';
import { LegalPersonsService } from './legal-persons.service';
//import { LegalPersonsController } from './legal-persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalPerson } from './entities/legal-person.entity';

@Module({
  //controllers: [LegalPersonsController],
  providers: [LegalPersonsService],
  imports: [TypeOrmModule.forFeature([LegalPerson])],
  exports: [LegalPersonsService]
})
export class LegalPersonsModule {}
