import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { EntityType } from './entity.enum';

@Entity('legal_persons')
export class LegalPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: EntityType })
  entity: EntityType;

  @Column()
  ruc: string;

  @Column()
  registerYear: number;

  @Column()
  emitterRating: string;

  @OneToOne(() => Profile, (profile) => profile.legalPerson)
  profile: Profile;

}
