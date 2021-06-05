import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { BondTypeEnum } from '../bond-type.enum';

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
  yearPeriods: number;

  @Column()
  periods: number;

  @Column()
  incomeTax: number;

  @Column()
  bonus: number;

  @Column()
  structuring: number;

  @Column()
  placement: number;

  @Column()
  floatation: number;

  @Column()
  cavali: number;

  @Column()
  effectiveAnnualRate: number;

  @Column()
  periodEffectiveRate: number;

  @Column()
  discountRate: number;

  @Column()
  periodRate: number;

  @Column()
  issuerInternalRateReturn: number;

  @Column()
  issuerAnnualEffectiveCostRate: number;

  @Column()
  issuerInternalRateTaxShield: number;

  @Column()
  issuerAnnualEffectiveCostRateTaxShield: number;

  @Column()
  holderInternalRateReturn: number;

  @Column()
  holderAnnualEffectiveCostRate: number;

  @Column()
  currentPrice: number;

  @Column()
  netPresentValue: number;

  @Column()
  duration: number;

  @Column()
  convexity: number;

  @Column()
  total: number;

  @Column()
  modifiedDuration: number;

  @Column()
  saleDate: Date;

  @ManyToOne(() => Profile, (profile) => profile.sellBonds)
  issuer: Profile;

  @ManyToOne(() => Profile, (profile) => profile.buyBonds)
  holder: Profile;

  /*
  @Column({ type: 'enum' })
  bondType: BondTypeEnum;

   */
}
