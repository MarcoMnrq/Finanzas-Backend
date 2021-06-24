import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bond } from "./bond.entity";
import { BondCalculatorInfo } from "./bondCalculatorInfo.entity";
@Entity('bondcalculatoroutput')
export class BondCalculatorOutput {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  couponFrequency: number;
  @Column()
  capitalization: number;
  @Column()
  periodsPerYear: number;
  @Column()
  totalPeriods: number;
  @Column()
  annualEfectiveRate: number;
  @Column()
  couponEfectiveRate: number;
  @Column()
  couponCok: number; 
  @Column()
  initialEmmiterCosts: number;
  @Column()
  initialHolderCosts: number;
  @Column()
  currentPrice: number;
  @Column()
  accumulatedBond?: number;
  @OneToOne(() => Bond, (bond) => bond.bondOutput)
  bond: Bond;
  @OneToMany(() => BondCalculatorInfo, (bondinfo) => bondinfo.bond)
  calculatorInfo: BondCalculatorInfo[];
}
