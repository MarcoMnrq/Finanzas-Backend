import { PaymentMethod } from './paymentMethod.enum';
import { Frequency } from './frequency.enum';
import { Rate } from './rate.enum';
import { GracePeriod } from './gracePeriod.enum';
import { Bond } from './bond.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('bondcalculatorinput')
export class BondCalculatorInput {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nominalValue: number;
  @Column()
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
  @Column()
  interestRate: number;
  @Column()
  annualDiscountRate: number;
  @Column()
  incomeTax: number;
  @Column()
  emmitionDate: Date;
  @Column()
  prima: number;
  @Column()
  flotacion: number;
  @Column()
  cavali: number;
  @Column()
  colocacion: number;
  @Column()
  estructuracion: number;
  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;
  @Column({ type: 'enum', enum: GracePeriod })
  gracePeriod: GracePeriod;
  @OneToOne(() => Bond, (bond) => bond.bondInput)
  bond: Bond;
}
