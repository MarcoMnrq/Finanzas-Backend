import { ApiProperty } from "@nestjs/swagger";

export class CreateNaturalPersonDto {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    dni: string;
}