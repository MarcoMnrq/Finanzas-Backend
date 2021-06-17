import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { PaymentMethod } from './paymentMethod.enum';
import { Frequency } from './frequency.enum';
import { Rate } from './rate.enum';
@Entity('bonds')
export class Bond {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  commercialValue: number;

  @Column()
  nominalValue: number;

  @Column()
  years: number;

  @Column()
  periodDays: number;

  @Column()
  yearDays: number;

  @Column()
  incomeTax: number;

  @Column()
  structuring: number;

  @Column()
  placement: number;

  @Column()
  floatation: number;

  @Column()
  cavali: number;

  @Column()
  prima: number;

  @Column()
  effectiveAnnualRate: number;

  @Column()
  discountRate: number;

  @Column()
  saleDate: Date;

  @Column()
  lastPaymentDate: Date;

  @Column()
  nextPaymentDate: Date;

  @ManyToOne(() => Profile, (profile) => profile.sellBonds)
  issuer: Profile;

  @ManyToOne(() => Profile, (profile) => profile.buyBonds)
  holder: Profile;

  @Column({type: 'enum', enum: PaymentMethod})
  paymentMethodType: PaymentMethod;

  @Column({ type: 'enum', enum: Frequency })
  couponFrequency: Frequency;

  @Column({type: 'enum', enum: Rate})
  interestRateType: Rate;

  @Column({ type: 'enum', enum: Frequency })
  capitalization: Frequency;
}
