import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BondOutput } from './bondCalculatorOutput.entity';
@Entity()
export class BondInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  index: number;
  @Column({nullable: true})
  date?: string | null;
  @Column("decimal", { precision: 20, scale: 6 })
  bond: number;
  @Column("decimal", { precision: 20, scale: 6 })
  coupon: number;
  @Column("decimal", {precision: 20, scale: 6, nullable: true})
  fee?: number | null;
  @Column("decimal", { precision: 20, scale: 6 })
  amortization: number;
  @Column("decimal", {precision: 20, scale: 6, nullable: true})
  prima?: number | null;
  @Column("decimal", {precision: 20, scale: 6, nullable: true})
  shield?: number|null;
  @Column("decimal", { precision: 20, scale: 6 })
  emmiterFlow: number;
  @Column("decimal", { precision: 20, scale: 6 })
  emmiterShieldFlow: number;
  @Column("decimal", { precision: 20, scale: 6 })
  holderFlow: number;
  @Column()
  gracePeriod: string;
  @ManyToOne(() => BondOutput, (bondOuput) => bondOuput.calculatorInfo)
  @JoinColumn()
  bondOutput: BondOutput;
}
