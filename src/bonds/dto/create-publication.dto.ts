import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateBondDto } from "./create-bond.dto";

export class BondDto{
    @IsNotEmpty()
    @ApiProperty()
    bondInput: CreateBondDto;
}

export class CreatePublicationBondDto {
    @IsNotEmpty()
    @ApiProperty()
    bond: BondDto;
    @IsNotEmpty()
    @ApiProperty()
    issuerId: number;
    @IsNotEmpty()
    @ApiProperty()
    name: string;
    @IsNotEmpty()
    @ApiProperty()
    description: string;
    @IsNotEmpty()
    @ApiProperty()
    expectedRate: number;
}