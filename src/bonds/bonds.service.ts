import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateBondDto } from './dto/create-bond.dto';
import { UpdateBondDto } from './dto/update-bond.dto';
import { Bond } from './entities/bond.entity';
import { plainToClass } from 'class-transformer';
import { calculateData, getduracionmod, getSiguienteFechaPago, gettir, getUltimaFechaPago } from './functions/calculatorFunctions';
import { BondInput } from './entities/bondCalculatorInput.entity';
import { BondInfo } from './entities/bondCalculatorInfo.entity';
import { BondOutput } from './entities/bondCalculatorOutput.entity';
import { CreatePublicationBondDto } from './dto/create-publication.dto';
import { BondPublication } from './entities/bondPublication.entity';
import { BondState } from './entities/bond-state.enum';
import { SellPublicationBondDto } from './dto/sell-publication.dto';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class BondsService {
  constructor(
    @InjectRepository(Bond) private readonly bondRepository: Repository<Bond>,
    @InjectRepository(BondInfo) private readonly bondinfoRepository: Repository<BondInfo>,
    @InjectRepository(BondInput) private readonly bondinputRepository: Repository<BondInput>,
    @InjectRepository(BondOutput) private readonly bondoutputRepository: Repository<BondOutput>,
    @InjectRepository(BondPublication) private readonly bondPublicationRepository: Repository<BondPublication>,
    private profilesService: ProfilesService
    ){}
  async create(publication: CreatePublicationBondDto) {
    var bono = await this.saveBond(publication.bond.bondInput);
    //ahora guardamos la publicación
    var bondOutput = calculateData(plainToClass(BondInput, publication.bond.bondInput));
    var aux = new Date();//Fecha de hoy
    var tir = gettir(bondOutput);
    if(Number.isNaN(tir)){
      tir = 0.0;
    }
    var ultimoPago = getUltimaFechaPago(bondOutput);
    var siguientePago = getSiguienteFechaPago(bondOutput);
    console.log(gettir(bondOutput));
    //Buscamos el profile del vendedor:
    var issuer = await this.profilesService.findOne(publication.issuerId);
    var publicationaux = {
      bond: bono,
      expectedRate: publication.expectedRate,
      description: publication.description,
      issuerProfile: issuer,
      holderProfile: null,
      state: BondState.Publicado,
      lastPaymentDate: ultimoPago,
      nextPaymentDate: siguientePago,
      name: publication.name,
      saleDate: aux,
      tir: tir,
      duracionmod: getduracionmod(bondOutput)
    } as BondPublication;
    return await this.bondPublicationRepository.save(publicationaux);
  }
  async sell(publication: SellPublicationBondDto, id: number){
    var publicationx = await this.bondPublicationRepository.findOne(id=id);
    publicationx.holderProfile = await this.profilesService.findOne(publication.buyerId);
    publicationx.state = BondState.Vendido;
    return await this.bondPublicationRepository.save(publicationx);
  }
  async saveBond(createBondDto: CreateBondDto){
    var bondinput = plainToClass(BondInput, createBondDto);
    var bondcalculatoroutput = calculateData(bondinput);
    var savedinput = await this.bondinputRepository.save(bondinput);
    var savedoutput = await this.bondoutputRepository.save(bondcalculatoroutput);
    var bonoaux = {
      bondInput: savedinput,
      bondOutput: savedoutput
    }as Bond;
    return await this.bondRepository.save(bonoaux);
  }
  async findAllSelling(){
    return await this.bondPublicationRepository.find({where: {state: BondState.Publicado}, relations: ["bond", "issuerProfile"]});
  }
  async findAllSold(){
    return await this.bondPublicationRepository.find({where: {state: BondState.Vendido}, relations: ["bond", "issuerProfile","holderProfile"]});
  }
  async findAll() {
    return await this.bondRepository.find({relations: ["bondInput", "bondOutput"]});
  }
  async findByHolderId(holderId: number){
    return await this.bondPublicationRepository.find({where: {holderProfile:{id:holderId}}, relations: ["bond","issuerProfile","holderProfile"]});
  }
  async findBySellerId(sellerId: number){
    return await this.bondPublicationRepository.find({where: {issuerProfile: {id: sellerId}}, relations: ["bond", "issuerProfile"]});
  }
  async findOne(id: number) {
    return await this.bondRepository.findOne(id=id,{relations: ["bondInput", "bondOutput"]});
  }

  async remove(id: number) {
    console.log(id);
    var bono = await this.bondRepository.findOne(id=id,{relations:["bondInput", "bondOutput"]   });
    console.log(bono);
    await this.bondRepository.remove(bono);
    await this.bondinputRepository.remove(bono.bondInput);
    await this.bondoutputRepository.remove(bono.bondOutput);
    return;
  }
}











