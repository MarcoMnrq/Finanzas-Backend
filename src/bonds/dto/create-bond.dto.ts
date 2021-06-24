import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethod } from '../entities/paymentMethod.enum';
import { Frequency } from '../entities/frequency.enum';
import { Rate } from '../entities/rate.enum';
import { GracePeriod } from '../entities/gracePeriod.enum';
import { IsNotEmpty } from "class-validator";

export class CreateBondDto {
    @IsNotEmpty()
    @ApiProperty()
    nominalValue: number;
    @IsNotEmpty()
    @ApiProperty()
    commercialValue: number;
    @IsNotEmpty()
    @ApiProperty()
    years: number;
    @IsNotEmpty()
    @ApiProperty()
    couponFrequency: Frequency;
    @IsNotEmpty()
    @ApiProperty()
    daysPerYear: number;
    @IsNotEmpty()
    @ApiProperty()
    interestRateType: Rate;
    @IsNotEmpty()
    @ApiProperty()
    capitalization: Frequency;
    @IsNotEmpty()
    @ApiProperty()
    interestRate: number;
    @IsNotEmpty()
    @ApiProperty()
    annualDiscountRate: number;
    @IsNotEmpty()
    @ApiProperty()
    incomeTax: number;
    @IsNotEmpty()
    @ApiProperty()
    emmitionDate: Date;
    @IsNotEmpty()
    @ApiProperty()
    prima: number;
    @IsNotEmpty()
    @ApiProperty()
    flotacion: number;
    @IsNotEmpty()
    @ApiProperty()
    cavali: number;
    @IsNotEmpty()
    @ApiProperty()
    colocacion: number;
    @IsNotEmpty()
    @ApiProperty()
    estructuracion: number;
    @IsNotEmpty()
    @ApiProperty()
    paymentMethod: PaymentMethod;
    @IsNotEmpty()
    @ApiProperty()
    gracePeriod: GracePeriod;
}
