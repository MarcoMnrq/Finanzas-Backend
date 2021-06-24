import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { PaymentMethod } from './paymentMethod.enum';
import { Frequency } from './frequency.enum';
import { Rate } from './rate.enum';
import { GracePeriod } from './gracePeriod.enum';
import { BondInfo } from './bondinfo.entity';
@Entity('bonds')
export class Bond {
  @PrimaryGeneratedColumn()
  id: number;
  //A partir de aqui son los datos de entrada
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
  incomeTax: number;
  @Column()
  flotacion: number;
  @Column()
  cavali: number;
  @Column()
  prima: number;
  @Column()
  interestRate: number;
  @Column()
  annualDiscountRate: number;
  @Column()
  emmitionDate: Date;
  @Column()
  colocacion: number;
  @Column()
  estructuracion: number;
  //A partir de aqui son datos calculados
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
  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;
  @Column({ type: 'enum', enum: GracePeriod })
  gracePeriod: GracePeriod;
  @ManyToOne(() => Profile, (profile) => profile.sellBonds)
  issuer: Profile;
  @ManyToOne(() => Profile, (profile) => profile.buyBonds)
  holder: Profile;
  @OneToMany(() => BondInfo, (bondinfo) => bondinfo.bond)
  bondinfo: BondInfo[];
}
