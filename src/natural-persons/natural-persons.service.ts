import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNaturalPersonDto } from './dto/create-natural-person.dto';
import { UpdateNaturalPersonDto } from './dto/update-natural-person.dto';
import { NaturalPerson } from './entities/natural-person.entity';

@Injectable()
export class NaturalPersonsService {
  constructor(
    @InjectRepository(NaturalPerson) private readonly naturalPersonRepository: Repository<NaturalPerson>
    ){}
  async create(createNaturalPersonDto: CreateNaturalPersonDto) {
    return await this.naturalPersonRepository.save(await this.naturalPersonRepository.create(createNaturalPersonDto));
  }

  async findAll() {
    return await this.naturalPersonRepository.find();
    return `This action returns all naturalPersons`;
  }

  async findOne(id: number) {
    return await this.naturalPersonRepository.findOne(id=id);
  }

  update(id: number, updateNaturalPersonDto: UpdateNaturalPersonDto) {
    return `This action updates a #${id} naturalPerson`;
  }

  remove(id: number) {
    return `This action removes a #${id} naturalPerson`;
  }
}
