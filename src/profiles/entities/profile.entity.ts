import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';
import { LegalPerson } from '../../legal-persons/entities/legal-person.entity';
import { NaturalPerson } from '../../natural-persons/entities/natural-person.entity';
import { BondPublication } from "../../bonds/entities/bondPublication.entity";

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToMany(() => BondPublication, (publication) => publication.issuerProfile)
  sellBonds: BondPublication[];

  @OneToMany(() => BondPublication, (publication) => publication.holderProfile)
  buyBonds: BondPublication[];

  @OneToOne(() => LegalPerson, (legalPerson) => legalPerson.profile, {nullable: true})
  @JoinColumn()
  legalPerson: LegalPerson|null;

  @OneToOne(() => NaturalPerson, (naturalPerson) => naturalPerson, {nullable: true})
  @JoinColumn()
  naturalPerson: NaturalPerson| null;
}
