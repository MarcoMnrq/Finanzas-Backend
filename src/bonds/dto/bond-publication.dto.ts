import { BondState } from "../entities/bond-state.enum";
import { Bond } from '../../bonds/entities/bond.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "src/profiles/entities/profile.entity";
import { ApiProperty } from "@nestjs/swagger";
export class BondPublicationDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    bond: Bond;
    @ApiProperty()
    expectedRate: number;
    @ApiProperty()
    description: string;
    @ApiProperty()
    issuerProfile: Profile;
    @ApiProperty()
    holderProfile: Profile | null;
    @ApiProperty()
    state: BondState;
    @ApiProperty()
    lastPaymentDate?: Date | null;
    @ApiProperty()
    nextPaymentDate?: Date | null;
    @ApiProperty()
    name: string;
    @ApiProperty()
    saleDate: Date;
  }