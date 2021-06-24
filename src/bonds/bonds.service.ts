import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBondDto } from './dto/create-bond.dto';
import { UpdateBondDto } from './dto/update-bond.dto';
import { Bond } from './entities/bond.entity';
import { npv, pmt, irr } from "financial";
import { PaymentMethod } from './entities/paymentMethod.enum';
import { Frequency } from './entities/frequency.enum';
import { Rate } from './entities/rate.enum';
import { GracePeriod } from './entities/gracePeriod.enum';
import { BondInfo } from './entities/bondinfo.entity';
import { CreateBondInfoDto } from './dto/create-bondinfo.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BondsService {
  constructor(@InjectRepository(Bond) private readonly bondRepository: Repository<Bond>, @InjectRepository(BondInfo) private readonly bondInfoRepository: Repository<BondInfo>){}
  async create(createBondDto: CreateBondDto) {
    var aux = this.calculateData(createBondDto);
    console.log(aux);
    return await this.bondRepository.save(aux);
  }

  async findAll() {
    return await this.bondRepository.find();
  }

  async findOne(id: number) {
    return await this.bondRepository.findOne(id=id);
  }

  async update(id: number, updateBondDto: UpdateBondDto) {
    //TODO: aqui re-calculariamos todos los datos del bono
    return await this.bondRepository.update(id=id, updateBondDto);
  }

  async remove(id: number) {
    return await this.bondRepository.delete(id=id);
  }

  calculateData(data: CreateBondDto): Bond {
    let output = {} as Bond;  
    const couponFrequency = this.frequencyToDay(data.couponFrequency);  
    const capitalization = this.frequencyToDay(data.capitalization);
  
    output.couponFrequency = couponFrequency;
    output.capitalization = capitalization;
    output.periodsPerYear = Math.floor(data.daysPerYear / couponFrequency);
    output.totalPeriods = output.periodsPerYear * data.years;
  
    if (data.interestRateType === Rate.Efectiva) {
      output.annualEfectiveRate = data.interestRate;
    } else {
      output.annualEfectiveRate = Math.pow(
        (1 + data.interestRate) / (data.daysPerYear / capitalization),
        data.daysPerYear / capitalization - 1
      );
    }
  
    output.couponEfectiveRate =
      Math.pow(
        1 + output.annualEfectiveRate,
        couponFrequency / data.daysPerYear
      ) - 1;
    output.couponEfectiveRate = parseFloat(output.couponEfectiveRate.toFixed(2));
  
    output.couponCok =
      Math.pow(1 + data.annualDiscountRate, couponFrequency / data.daysPerYear) -
      1;
  
    output.couponCok = parseFloat(output.couponCok.toFixed(3));
  
    const costs =
      (data.cavali + data.flotacion + data.estructuracion + data.colocacion) *
      data.commercialValue;
  
    output.initialHolderCosts = costs;
    output.initialEmmiterCosts = costs;
    switch (data.paymentMethod) {
      case PaymentMethod.Aleman:
        output.bondinfo = this.germanMethod(data, output);
        break;
      case PaymentMethod.Frances:
        output.bondinfo = this.frenchMethod(data, output);
        break;
      case PaymentMethod.Ingles:
        output.bondinfo = this.englishMethod(data, output);
        break;
      default:
        output.bondinfo = [];
        break;
    }
  
    let flows = output.bondinfo.slice(1).map((v) => v.holderFlow);
    flows.splice(0,0,0);
  
    output.currentPrice = npv(output.couponCok, flows);
    return output;
  }
  addDays(datex: Date, days: number): Date {
    var aux = new Date(datex);
    const copy = new Date(Number(aux));
    copy.setDate(aux.getDate() + days);
    return copy;
  }
  frequencyToDay(frequency: Frequency): number {
    switch (frequency) {
      case Frequency.Diaria:
        return 1;
      case Frequency.Mensual:
        return 30;
      case Frequency.Bimestral:
        return 60;
      case Frequency.Trimestral:
        return 90;
      case Frequency.Cuatrimestral:
        return 120;
      case Frequency.Semestral:
        return 180;
      case Frequency.Anual:
        return 360;
      default:
        return 1;
    }
  }
  germanMethod(inputData: CreateBondDto, outputData: Bond): BondInfo[] {
    let info = [];
    const initialValues = {
      index: 0,
      emmiterFlow: inputData.commercialValue - outputData.initialEmmiterCosts,
      emmiterShieldFlow:
        inputData.commercialValue - outputData.initialEmmiterCosts,
      holderFlow: -inputData.commercialValue - outputData.initialHolderCosts,
      bond: 0,
      coupon: 0,
      amortization: 0,
      gracePeriod: "",
      bondValue: 0,
    } as CreateBondInfoDto;
  
    const couponFrequency = this.frequencyToDay(inputData.couponFrequency);
    
    info.push(plainToClass(BondInfo,initialValues));
  
    let lastDate = inputData.emmitionDate;
    for (let i = 1; i <= outputData.totalPeriods; ++i) {
      const date = this.addDays(lastDate, couponFrequency);
      const gracePeriod = inputData.gracePeriod;
  
      lastDate = new Date(date.getTime());
      let bondValue = inputData.nominalValue;
      const lastBond = info[i - 1];
      if (i > 1) {
        if (inputData.gracePeriod === GracePeriod.Total) {
          bondValue = lastBond.bondValue - lastBond.coupon;
        } else {
          bondValue = lastBond.bondValue + lastBond.amortization;
        }
      }
  
      const coupon = -bondValue * outputData.couponEfectiveRate;
      let amortization = 0;
      if (gracePeriod === GracePeriod.Sin) {
        amortization = -bondValue / (outputData.totalPeriods - i + 1);
      }
  
      let fee = 0;
      if (gracePeriod === GracePeriod.Parcial) {
        fee = coupon;
      } else if (gracePeriod === GracePeriod.Sin) {
        fee = coupon + amortization;
      }
  
      let prima = 0;
      if (i === outputData.totalPeriods) {
        prima = -inputData.prima * inputData.nominalValue;
      }
  
      const shield = -coupon * inputData.incomeTax;
      const emmiterFlow = fee + prima;
      const emmiterShieldFlow = emmiterFlow + shield;
      const holderFlow = -emmiterFlow;
      info.push({
        index: i,
        date: date.toLocaleDateString(),
        bondValue: parseFloat(bondValue.toFixed(2)),
        coupon: parseFloat(coupon.toFixed(2)),
        fee: parseFloat(fee.toFixed(2)),
        amortization: parseFloat(amortization.toFixed(2)),
        prima: parseFloat(prima.toFixed(2)),
        shield: parseFloat(shield.toFixed(2)),
        emmiterFlow: parseFloat(emmiterFlow.toFixed(2)),
        emmiterShieldFlow: parseFloat(emmiterShieldFlow.toFixed(2)),
        holderFlow: parseFloat(holderFlow.toFixed(2)),
        gracePeriod: GracePeriod[gracePeriod],
      });
      //} as BondInfo);
    }
    return info;
  }
  //TODO: REFACTOR
  frenchMethod(
    inputData: CreateBondDto,
    outputData: Bond
  ) {
    let info: BondInfo[] = [];
    const initialValues = {
      index: 0,
      emmiterFlow: inputData.commercialValue - outputData.initialEmmiterCosts,
      emmiterShieldFlow:
        inputData.commercialValue - outputData.initialEmmiterCosts,
      holderFlow: -inputData.commercialValue - outputData.initialHolderCosts,
      bond: 0,
      coupon: 0,
      amortization: 0,
      gracePeriod: "",
    } as CreateBondInfoDto;
  
    const couponFrequency = this.frequencyToDay(inputData.couponFrequency);
    info.push(this.bondInfoRepository.create(initialValues));
  
    let lastDate = inputData.emmitionDate;
    for (let i = 1; i <= outputData.totalPeriods; ++i) {
      const date = this.addDays(lastDate, couponFrequency);
      const gracePeriod = inputData.gracePeriod;
  
      lastDate = new Date(date.getTime());
  
      let bondValue = inputData.nominalValue;
      const lastBond = info[i - 1];
      if (i > 1) {
        if (inputData.gracePeriod === GracePeriod.Total) {
          bondValue = lastBond.bondValue - lastBond.coupon;
        } else {
          bondValue = lastBond.bondValue + lastBond.amortization;
        }
      }
      const coupon = -bondValue * outputData.couponEfectiveRate;
  
      let fee = 0;
      if (gracePeriod === GracePeriod.Parcial) {
        fee = coupon;
      } else if (gracePeriod === GracePeriod.Sin) {
        fee = pmt(
          inputData.interestRate,
          outputData.totalPeriods,
          inputData.nominalValue
        );
      }
  
      let amortization = 0;
      if (gracePeriod === GracePeriod.Sin) {
        amortization = fee - coupon;
      }
  
      let prima = 0;
      if (i === outputData.totalPeriods) {
        prima = -inputData.prima * inputData.nominalValue;
      }
  
      const shield = -coupon * inputData.incomeTax;
      const emmiterFlow = fee + prima;
      const emmiterShieldFlow = emmiterFlow + shield;
      const holderFlow = -emmiterFlow;
  
      info.push({
        index: i,
        date: date.toLocaleDateString(),
        bondValue: parseFloat(bondValue.toFixed(2)),
        coupon: parseFloat(coupon.toFixed(2)),
        fee: parseFloat(fee.toFixed(2)),
        amortization: parseFloat(amortization.toFixed(2)),
        prima: parseFloat(prima.toFixed(2)),
        shield: parseFloat(shield.toFixed(2)),
        emmiterFlow: parseFloat(emmiterFlow.toFixed(2)),
        emmiterShieldFlow: parseFloat(emmiterShieldFlow.toFixed(2)),
        holderFlow: parseFloat(holderFlow.toFixed(2)),
        gracePeriod: GracePeriod[gracePeriod],
      } as BondInfo);
    }
    return info;
  }
  //TODO: REFACTOR
  englishMethod(
    inputData: CreateBondDto,
    outputData: Bond
  ) {
    let info: BondInfo[] = [];
    const initialValues = {
      index: 0,
      emmiterFlow: inputData.commercialValue - outputData.initialEmmiterCosts,
      emmiterShieldFlow:
        inputData.commercialValue - outputData.initialEmmiterCosts,
      holderFlow: -inputData.commercialValue - outputData.initialHolderCosts,
      bond: 0,
      coupon: 0,
      amortization: 0,
      gracePeriod: "",
    } as CreateBondInfoDto;
  
    const couponFrequency = this.frequencyToDay(inputData.couponFrequency);
    info.push(this.bondInfoRepository.create(initialValues));
  
    let lastDate = inputData.emmitionDate;
    for (let i = 1; i <= outputData.totalPeriods; ++i) {
      const date = this.addDays(lastDate, couponFrequency);
      const gracePeriod = inputData.gracePeriod;
  
      lastDate = new Date(date.getTime());
  
      let bondValue = inputData.nominalValue;
      const lastBond = info[i - 1];
      if (i > 1) {
        if (inputData.gracePeriod === GracePeriod.Total) {
          bondValue = lastBond.bondValue - lastBond.coupon;
        } else {
          bondValue = lastBond.bondValue + lastBond.amortization;
        }
      }
  
      const coupon = -bondValue * outputData.couponEfectiveRate;
      let amortization = 0;
      if (i === outputData.totalPeriods) {
        amortization = -bondValue;
      }
  
      let fee = 0;
      if (gracePeriod === GracePeriod.Parcial) {
        fee = coupon;
      } else if (gracePeriod === GracePeriod.Sin) {
        fee = coupon + amortization;
      }
  
      let prima = 0;
      if (i === outputData.totalPeriods) {
        prima = -inputData.prima * inputData.nominalValue;
      }
  
      const shield = -coupon * inputData.incomeTax;
      const emmiterFlow = fee + prima;
      const emmiterShieldFlow = emmiterFlow + shield;
      const holderFlow = -emmiterFlow;
  
      info.push({
        index: i,
        date: date.toLocaleDateString(),
        bondValue: parseFloat(bondValue.toFixed(2)),
        coupon: parseFloat(coupon.toFixed(2)),
        fee: parseFloat(fee.toFixed(2)),
        amortization: parseFloat(amortization.toFixed(2)),
        prima: parseFloat(prima.toFixed(2)),
        shield: parseFloat(shield.toFixed(2)),
        emmiterFlow: parseFloat(emmiterFlow.toFixed(2)),
        emmiterShieldFlow: parseFloat(emmiterShieldFlow.toFixed(2)),
        holderFlow: parseFloat(holderFlow.toFixed(2)),
        gracePeriod: GracePeriod[gracePeriod],
      } as BondInfo);
    }
    return info;
  }
}











