import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { EntityType } from "../entities/entity.enum";

export class CreateLegalPersonDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;
    @IsNotEmpty()
    @ApiProperty()
    entity: EntityType;
    @IsNotEmpty()
    @ApiProperty()
    ruc: string;
    @IsNotEmpty()
    @ApiProperty()
    registerYear: number;
    @IsNotEmpty()
    @ApiProperty()
    emitterRating: string;
}
