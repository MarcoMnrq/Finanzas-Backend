import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bond } from "./bond.entity";
import { BondInfo } from "./bondCalculatorInfo.entity";
@Entity()
export class BondOutput {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("decimal", { precision: 20, scale: 6 })
  couponFrequency: number;
  @Column("decimal", { precision: 20, scale: 6 })
  capitalization: number;
  @Column()
  periodsPerYear: number;
  @Column()
  totalPeriods: number;
  @Column("decimal", { precision: 20, scale: 6 })
  annualEfectiveRate: number;
  @Column("decimal", { precision: 20, scale: 6 })
  couponEfectiveRate: number;
  @Column("decimal", { precision: 20, scale: 6 })
  couponCok: number;
  @Column("decimal", { precision: 20, scale: 6 })
  initialEmmiterCosts: number;
  @Column("decimal", { precision: 20, scale: 6 })
  initialHolderCosts: number;
  @Column("decimal", { precision: 20, scale: 6 })
  currentPrice: number;
  @Column({nullable: true})
  accumulatedBond?: number | null;
  @OneToOne(() => Bond, (bond) => bond.bondOutput)
  bond: Bond;
  @OneToMany(() => BondInfo, (bondinfo) => bondinfo.bond)
  calculatorInfo: BondInfo[];
}
