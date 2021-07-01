import { npv, pmt, irr } from "financial";
import { BondInfo } from "../entities/bondCalculatorInfo.entity";
import { BondInput } from "../entities/bondCalculatorInput.entity";
import { BondOutput } from "../entities/bondCalculatorOutput.entity";
import { Frequency } from "../entities/frequency.enum";
import { GracePeriod } from "../entities/gracePeriod.enum";
import { PaymentMethod } from "../entities/paymentMethod.enum";
import { Rate } from "../entities/rate.enum";

export function gettir(aux: BondOutput){
  //Aqui sacamos el emmiter flow
  var emmiterflowaux = [];
  aux.calculatorInfo.forEach(el => {
    emmiterflowaux.push(el.emmiterFlow);
  })
  return irr(emmiterflowaux);
}
function gettiraux(bondCalculatorInfo){
  var emmiterflowaux = [];
  bondCalculatorInfo.forEach(el => {
    emmiterflowaux.push(el.emmiterFlow);
  })
  return irr(emmiterflowaux);
}
export function getUltimaFechaPago(aux: BondOutput){
  //Ahora tenemos que iterar sobre los infos para ver donde cuadra la fecha actual
  var fechaact = new Date();
  var ultimoPago = new Date();
  for (let i = 0; i < aux.calculatorInfo.length; i++) {
    if(aux.calculatorInfo[i].date){
      var auxdate = parseDMY(aux.calculatorInfo[i].date);
      if(fechaact > auxdate){
        ultimoPago = auxdate;
      }
    }
  }
  return ultimoPago;
}
export function getSiguienteFechaPago(aux: BondOutput){
  //Ahora tenemos que iterar sobre los infos para ver donde cuadra la fecha actual
  var fechaact = new Date();
  var ultimoPago = new Date();
  var posicion = 0;
  for (let i = 0; i < aux.calculatorInfo.length; i++) {
    if(aux.calculatorInfo[i].date){
      var auxdate = parseDMY(aux.calculatorInfo[i].date);
      if(fechaact > auxdate){
        ultimoPago = auxdate;
        posicion = i;
      }
    }
  }
  if(posicion+1>aux.calculatorInfo.length){
    return null;
  }
  return parseDMY(aux.calculatorInfo[posicion+1].date);
}
function parseDMY(s) {
  var b = s.split(/\D+/);
  return new Date(b[2], b[1]-1, b[0]);
}
export function getduracionmod(BondInput){
  var aux = calculateData(BondInput);
  var duracion = 0.0;
  for (let i = 0; i < aux.calculatorInfo.length; i++) {
    duracion += ((i*aux.calculatorInfo[i].coupon)/aux.currentPrice)/(1+gettiraux(aux.calculatorInfo)/aux.totalPeriods);
  }
  return duracion;
}

export function calculateData(data: BondInput): BondOutput {
  let output = {} as BondOutput;
  console.log(data);

  const couponFrequency = frequencyToDay(data.couponFrequency);
  console.log(couponFrequency);

  const capitalization = frequencyToDay(data.capitalization);

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
      output.calculatorInfo = germanMethod(data, output);
      break;
    case PaymentMethod.Frances:
      output.calculatorInfo = frenchMethod(data, output);
      break;
    case PaymentMethod.Ingles:
      output.calculatorInfo = englishMethod(data, output);
      break;
    default:
      output.calculatorInfo = [];
      break;
  }

  let flows = output.calculatorInfo.slice(1).map((v) => v.holderFlow);
  flows.splice(0,0,0);

  output.currentPrice = npv(output.couponCok, flows);
  return output;
}

function addDays(date: Date, days: number): Date {
  var aux = new Date(date);
  const copy = new Date(Number(aux));
  copy.setDate(aux.getDate() + days);
  return copy;
}

function frequencyToDay(frequency: Frequency): number {
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

function germanMethod(
  inputData: BondInput,
  outputData: BondOutput
): BondInfo[] {
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
  } as BondInfo;

  const couponFrequency = frequencyToDay(inputData.couponFrequency);
  info.push(initialValues);

  let lastDate = inputData.emmitionDate;
  for (let i = 1; i <= outputData.totalPeriods; ++i) {
    const date = addDays(lastDate, couponFrequency);
    const gracePeriod = inputData.gracePeriod;

    lastDate = new Date(date.getTime());

    let bondValue = inputData.nominalValue;
    const lastBond = info[i - 1];
    if (i > 1) {
      if (inputData.gracePeriod === GracePeriod.Total) {
        bondValue = lastBond.bond - lastBond.coupon;
      } else {
        bondValue = lastBond.bond + lastBond.amortization;
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
      bond: parseFloat(bondValue.toFixed(2)),
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

function frenchMethod(
  inputData: BondInput,
  outputData: BondOutput
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
  } as BondInfo;

  const couponFrequency = frequencyToDay(inputData.couponFrequency);
  info.push(initialValues);

  let lastDate = inputData.emmitionDate;
  for (let i = 1; i <= outputData.totalPeriods; ++i) {
    const date = addDays(lastDate, couponFrequency);
    const gracePeriod = inputData.gracePeriod;

    lastDate = new Date(date.getTime());

    let bondValue = inputData.nominalValue;
    const lastBond = info[i - 1];
    if (i > 1) {
      if (inputData.gracePeriod === GracePeriod.Total) {
        bondValue = lastBond.bond - lastBond.coupon;
      } else {
        bondValue = lastBond.bond + lastBond.amortization;
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
      bond: parseFloat(bondValue.toFixed(2)),
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

function englishMethod(
  inputData: BondInput,
  outputData: BondOutput
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
  } as BondInfo;

  const couponFrequency = frequencyToDay(inputData.couponFrequency);
  info.push(initialValues);

  let lastDate = inputData.emmitionDate;
  for (let i = 1; i <= outputData.totalPeriods; ++i) {
    const date = addDays(lastDate, couponFrequency);
    const gracePeriod = inputData.gracePeriod;

    lastDate = new Date(date.getTime());

    let bondValue = inputData.nominalValue;
    const lastBond = info[i - 1];
    if (i > 1) {
      if (inputData.gracePeriod === GracePeriod.Total) {
        bondValue = lastBond.bond - lastBond.coupon;
      } else {
        bondValue = lastBond.bond + lastBond.amortization;
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
      bond: parseFloat(bondValue.toFixed(2)),
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