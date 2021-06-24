import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBondDto } from './dto/create-bond.dto';
import { UpdateBondDto } from './dto/update-bond.dto';
import { Bond } from './entities/bond.entity';
import { plainToClass } from 'class-transformer';
import { calculateData } from './functions/calculatorFunctions';
import { BondCalculatorInput } from './entities/bondCalculatorInput.entity';

@Injectable()
export class BondsService {
  constructor(@InjectRepository(Bond) private readonly bondRepository: Repository<Bond>){}
  async create(createBondDto: CreateBondDto) {
    var bondinput = plainToClass(BondCalculatorInput ,createBondDto);
    var bondcalculatoroutput = calculateData(bondinput);
    var bonoaux = {
      bondInput: bondinput,
      bondOutput: bondcalculatoroutput
    }as Bond;
    return await this.bondRepository.save(bonoaux);
  }

  async findAll() {
    return await this.bondRepository.find();
  }

  async findOne(id: number) {
    return await this.bondRepository.findOne(id=id);
  }

  async update(id: number, updateBondDto: UpdateBondDto) {
    //TODO: aqui re-calculariamos todos los datos del bono
    //TODOreturn await this.bondRepository.update(id=id, updateBondDto);
  }

  async remove(id: number) {
    return await this.bondRepository.delete(id=id);
  }
}











