import { Module } from '@nestjs/common';
import { NaturalPersonsService } from './natural-persons.service';
import { NaturalPersonsController } from './natural-persons.controller';
import { NaturalPerson } from './entities/natural-person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [NaturalPersonsController],
  providers: [NaturalPersonsService],
  imports: [TypeOrmModule.forFeature([NaturalPerson])],
  exports: [NaturalPersonsService]
})
export class NaturalPersonsModule {}
