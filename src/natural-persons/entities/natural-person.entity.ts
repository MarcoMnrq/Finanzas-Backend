import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity('natural_persons')
export class NaturalPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dni: string;

  @OneToOne(() => Profile, (profile) => profile.legalPerson)
  profile: Profile;
}
