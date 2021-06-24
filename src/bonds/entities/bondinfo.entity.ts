import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bond } from './bond.entity';
@Entity('bondsinfo')
export class BondInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  index: number;
  @Column()
  bondValue: number;
  @Column()
  date?: string;
  @Column()
  coupon: number;
  @Column()
  fee?: number;
  @Column()
  amortization: number;
  @Column()
  prima?: number;
  @Column()
  shield?: number;
  @Column()
  emmiterFlow: number;
  @Column()
  emmiterShieldFlow: number;
  @Column()
  holderFlow: number;
  @Column()
  gracePeriod: string;
  @ManyToOne(() => Bond, (bond) => bond.bondinfo)
  bond: Bond;
}
