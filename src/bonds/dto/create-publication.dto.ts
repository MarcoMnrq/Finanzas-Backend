import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateBondDto } from "./create-bond.dto";
export class CreatePublicationBondDto {
    @IsNotEmpty()
    @ApiProperty()
    bond: CreateBondDto;
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