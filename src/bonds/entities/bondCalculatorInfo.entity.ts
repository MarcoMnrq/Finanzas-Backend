import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BondCalculatorOutput } from './bondCalculatorOutput.entity';
@Entity('bondcalculatorinfo')
export class BondCalculatorInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  index: number;
  @Column()
  date?: string;
  @Column()
  bond: number;
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
  @ManyToOne(() => BondCalculatorOutput, (bondOuput) => bondOuput.calculatorInfo)
  bondOutput: BondCalculatorOutput;
}
