import { ApiProperty } from "@nestjs/swagger";
import { Bond } from '../entities/bond.entity';
import { IsNotEmpty } from "class-validator";
export class CreateBondInfoDto {
  @IsNotEmpty()
  index: number;
  date?: string;
  @IsNotEmpty()
  coupon: number;
  fee?: number;
  @IsNotEmpty()
  amortization: number;
  prima?: number;
  @IsNotEmpty()
  shield?: number;
  @IsNotEmpty()
  emmiterFlow: number;
  @IsNotEmpty()
  emmiterShieldFlow: number;
  @IsNotEmpty()
  holderFlow: number;
  @IsNotEmpty()
  gracePeriod: string;
  //Como es una clase que no lo va a manejar el usuario, no recibimos un bond
  //@ManyToOne(() => Bond, (bond) => bond.bondinfo)
  //bond: Bond;

}