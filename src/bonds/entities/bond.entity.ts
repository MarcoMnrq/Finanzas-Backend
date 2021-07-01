import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { BondInput } from './bondCalculatorInput.entity';
import { BondOutput } from './bondCalculatorOutput.entity';
import { BondPublication } from './bondPublication.entity';
@Entity()
export class Bond {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(()=>BondInput, bondInput => bondInput.bond)
  @JoinColumn()
  bondInput: BondInput;
  @OneToOne(()=>BondOutput, bondOutput => bondOutput.bond)
  @JoinColumn()
  bondOutput: BondOutput;
  @OneToOne(() => BondPublication, (bondPublication) => bondPublication.bond)
  bondPublication: BondPublication;
}
