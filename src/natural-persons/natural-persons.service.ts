import { Injectable } from '@nestjs/common';
import { CreateNaturalPersonDto } from './dto/create-natural-person.dto';
import { UpdateNaturalPersonDto } from './dto/update-natural-person.dto';

@Injectable()
export class NaturalPersonsService {
  create(createNaturalPersonDto: CreateNaturalPersonDto) {
    return 'This action adds a new naturalPerson';
  }

  findAll() {
    return `This action returns all naturalPersons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} naturalPerson`;
  }

  update(id: number, updateNaturalPersonDto: UpdateNaturalPersonDto) {
    return `This action updates a #${id} naturalPerson`;
  }

  remove(id: number) {
    return `This action removes a #${id} naturalPerson`;
  }
}
