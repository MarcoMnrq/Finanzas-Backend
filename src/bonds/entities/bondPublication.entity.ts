import { BondState } from "./bond-state.enum";
import { Bond } from '../../bonds/entities/bond.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "src/profiles/entities/profile.entity";
@Entity()
export class BondPublication {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(()=>Bond, bond => bond.bondPublication)
  @JoinColumn()
  bond: Bond;
  @Column("decimal", { precision: 20, scale: 6 })
  expectedRate: number;
  @Column()
  description: string;
  @ManyToOne(() => Profile, (profile) => profile.sellBonds)
  @JoinColumn()
  issuerProfile: Profile;
  @ManyToOne(() => Profile, (profile) => profile.buyBonds, {nullable: true})
  @JoinColumn()
  holderProfile: Profile | null;
  @Column({ type: 'enum', enum: BondState })
  state: BondState;
  @Column({nullable: true})
  lastPaymentDate?: Date | null;
  @Column({nullable: true})
  nextPaymentDate?: Date | null;
  @Column()
  name: string;
  @Column()
  saleDate: Date;
  @Column("decimal", { precision: 20, scale: 6 })
  tir: number;
  @Column("decimal", { precision: 20, scale: 6 })
  duracionmod: number;
}