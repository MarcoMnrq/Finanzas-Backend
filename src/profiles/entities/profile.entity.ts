import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';
import { LegalPerson } from '../../legal-persons/entities/legal-person.entity';
import { NaturalPerson } from '../../natural-persons/entities/natural-person.entity';
import { Bond } from '../../bonds/entities/bond.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToMany(() => Bond, (bond) => bond.issuer)
  sellBonds: Bond[];

  @OneToMany(() => Bond, (bond) => bond.holder)
  buyBonds: Bond[];

  @OneToOne(() => LegalPerson, (legalPerson) => legalPerson.profile)
  @JoinColumn()
  legalPerson: LegalPerson;

  @OneToOne(() => NaturalPerson, (naturalPerson) => naturalPerson)
  @JoinColumn()
  naturalPerson: NaturalPerson;
}
