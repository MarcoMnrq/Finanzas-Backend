import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { BondCalculatorInput } from './bondCalculatorInput.entity';
import { BondCalculatorOutput } from './bondCalculatorOutput.entity';
@Entity('bonds')
export class Bond {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(()=>BondCalculatorInput, (bondCalculatorInput) => bondCalculatorInput.bond)
  bondInput: BondCalculatorInput;
  @OneToOne(()=>BondCalculatorOutput, (bondCalculatorOutput) => bondCalculatorOutput.bond)
  bondOutput: BondCalculatorOutput;
  @ManyToOne(() => Profile, (profile) => profile.sellBonds)
  issuer: Profile;
  @ManyToOne(() => Profile, (profile) => profile.buyBonds)
  holder: Profile;
}
