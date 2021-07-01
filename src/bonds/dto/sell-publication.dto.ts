import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateBondDto } from "./create-bond.dto";
//Literalmente vende un bono publicado
export class SellPublicationBondDto {
    @IsNotEmpty()
    @ApiProperty()
    sellerId: number;
}