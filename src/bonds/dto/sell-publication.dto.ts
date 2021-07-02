import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
//Literalmente vende un bono publicado
export class SellPublicationBondDto {
    @IsNotEmpty()
    @ApiProperty()
    buyerId: number;
}