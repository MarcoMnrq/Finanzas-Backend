import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { LegalPersonsTypesEnum } from '../legal-persons-types.enum';

@Entity('legal_persons')
export class LegalPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /*
  @Column({ type: 'enum' })
  type: LegalPersonsTypesEnum;

   */

  @Column()
  ruc: string;

  @Column()
  registerYear: number;

  @OneToOne(() => Profile, (profile) => profile.legalPerson)
  profile: Profile;
}
