import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBondDto } from './dto/create-bond.dto';
import { UpdateBondDto } from './dto/update-bond.dto';
import { Bond } from './entities/bond.entity';
import { plainToClass } from 'class-transformer';
import { calculateData } from './functions/calculatorFunctions';
import { BondCalculatorInput } from './entities/bondCalculatorInput.entity';
import { BondCalculatorInfo } from './entities/bondCalculatorInfo.entity';
import { BondCalculatorOutput } from './entities/bondCalculatorOutput.entity';

@Injectable()
export class BondsService {
  constructor(
    @InjectRepository(Bond) private readonly bondRepository: Repository<Bond>,
    @InjectRepository(BondCalculatorInfo) private readonly bondinfoRepository: Repository<BondCalculatorInfo>,
    @InjectRepository(BondCalculatorInput) private readonly bondinputRepository: Repository<BondCalculatorInput>,
    @InjectRepository(BondCalculatorOutput) private readonly bondoutputRepository: Repository<BondCalculatorOutput>
    ){}
  async create(createBondDto: CreateBondDto) {
    var bondinput = plainToClass(BondCalculatorInput ,createBondDto);
    var bondcalculatoroutput = calculateData(bondinput);
    var savedinput = await this.bondinputRepository.save(bondinput);
    var savedoutput = await this.bondoutputRepository.save(bondcalculatoroutput);
    //guardamos las partes del bono:
    // for (let i = 0; i < bondcalculatoroutput.calculatorInfo.length; i++) {
    //   bondcalculatoroutput.calculatorInfo[i].bondOutput=savedoutput;
    //   await this.bondinfoRepository.save(bondcalculatoroutput.calculatorInfo[i]);
    // }
    //establecemos la relacion entre el input/output y el bono:
    var bonoaux = {
      bondInput: savedinput,
      bondOutput: savedoutput
    }as Bond;
    return await this.bondRepository.save(bonoaux);
  }

  async findAll() {
    return await this.bondRepository.find();
    //return await this.bondRepository.find({relations: ["bondcalculatoroutput","bondcalculatorinput"]});
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











