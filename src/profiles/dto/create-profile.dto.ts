import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { CreateLegalPersonDto } from "../../legal-persons/dto/create-legal-person.dto";
import { CreateNaturalPersonDto } from "../../natural-persons/dto/create-natural-person.dto";

export class CreateProfileDto {
    @IsNotEmpty()
    @ApiProperty()
    userId: number;
    @IsOptional()
    @ApiProperty()
    legalPerson: CreateLegalPersonDto;
    @IsOptional()
    @ApiProperty()
    naturalPerson: CreateNaturalPersonDto;
}