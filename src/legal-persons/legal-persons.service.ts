import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLegalPersonDto } from './dto/create-legal-person.dto';
import { UpdateLegalPersonDto } from './dto/update-legal-person.dto';
import { LegalPerson } from './entities/legal-person.entity';

@Injectable()
export class LegalPersonsService {
  constructor(
    @InjectRepository(LegalPerson) private readonly legalPersonRepository: Repository<LegalPerson>
    ){}
  async create(createLegalPersonDto: CreateLegalPersonDto) {
    return await this.legalPersonRepository.save(createLegalPersonDto);
  }

  async findAll() {
    return await this.legalPersonRepository.find();
  }

  async findOne(id: number) {
    return await this.legalPersonRepository.findOne(id=id);
  }

  update(id: number, updateLegalPersonDto: UpdateLegalPersonDto) {
    return `This action updates a #${id} legalPerson`;
  }

  remove(id: number) {
    return `This action removes a #${id} legalPerson`;
  }
}
