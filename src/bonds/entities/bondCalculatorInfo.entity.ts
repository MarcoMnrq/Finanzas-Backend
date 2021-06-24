import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BondCalculatorOutput } from './bondCalculatorOutput.entity';
@Entity('bondcalculatorinfo')
export class BondCalculatorInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  index: number;
  @Column({nullable: true})
  date?: string | null;
  @Column()
  bond: number;
  @Column()
  coupon: number;
  @Column({nullable: true})
  fee?: number | null;
  @Column()
  amortization: number;
  @Column({nullable: true})
  prima?: number | null;
  @Column({nullable: true})
  shield?: number|null;
  @Column()
  emmiterFlow: number;
  @Column()
  emmiterShieldFlow: number;
  @Column()
  holderFlow: number;
  @Column()
  gracePeriod: string;
  @ManyToOne(() => BondCalculatorOutput, (bondOuput) => bondOuput.calculatorInfo)
  @JoinColumn({ name: 'bondoutputid' })
  bondOutput: BondCalculatorOutput;
}
