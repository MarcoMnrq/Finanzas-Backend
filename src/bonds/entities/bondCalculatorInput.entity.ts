import { PaymentMethod } from './paymentMethod.enum';
import { Frequency } from './frequency.enum';
import { Rate } from './rate.enum';
import { GracePeriod } from './gracePeriod.enum';
import { Bond } from './bond.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class BondInput {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("decimal", { precision: 20, scale: 6 })
  nominalValue: number;
  @Column("decimal", { precision: 20, scale: 6 })
  commercialValue: number;
  @Column()
  years: number;
  @Column({ type: 'enum', enum: Frequency })
  couponFrequency: Frequency;
  @Column()
  daysPerYear: number;
  @Column({ type: 'enum', enum: Rate })
  interestRateType: Rate;
  @Column({ type: 'enum', enum: Frequency })
  capitalization: Frequency;
  @Column("decimal", { precision: 20, scale: 6 })
  interestRate: number;
  @Column("decimal", { precision: 20, scale: 6 })
  annualDiscountRate: number;
  @Column("decimal", { precision: 20, scale: 6 })
  incomeTax: number;
  @Column()
  emmitionDate: Date;
  @Column("decimal", { precision: 20, scale: 6 })
  prima: number;
  @Column("decimal", { precision: 20, scale: 6 })
  flotacion: number;
  @Column("decimal", { precision: 20, scale: 6 })
  cavali: number;
  @Column("decimal", { precision: 20, scale: 6 })
  colocacion: number;
  @Column("decimal", { precision: 20, scale: 6 })
  estructuracion: number;
  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;
  @Column({ type: 'enum', enum: GracePeriod })
  gracePeriod: GracePeriod;
  @OneToOne(() => Bond, (bond) => bond.bondInput)
  bond: Bond;
}
