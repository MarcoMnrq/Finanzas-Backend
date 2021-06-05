import { Injectable } from '@nestjs/common';
import { CreateLegalPersonDto } from './dto/create-legal-person.dto';
import { UpdateLegalPersonDto } from './dto/update-legal-person.dto';

@Injectable()
export class LegalPersonsService {
  create(createLegalPersonDto: CreateLegalPersonDto) {
    return 'This action adds a new legalPerson';
  }

  findAll() {
    return `This action returns all legalPersons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} legalPerson`;
  }

  update(id: number, updateLegalPersonDto: UpdateLegalPersonDto) {
    return `This action updates a #${id} legalPerson`;
  }

  remove(id: number) {
    return `This action removes a #${id} legalPerson`;
  }
}
