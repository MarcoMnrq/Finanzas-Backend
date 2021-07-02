import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateLegalPersonDto } from '../../legal-persons/dto/create-legal-person.dto';
import { CreateNaturalPersonDto } from '../../natural-persons/dto/create-natural-person.dto';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsOptional()
  @ApiProperty()
  legalPerson: CreateLegalPersonDto;
  
  @IsOptional()
  @ApiProperty()
  naturalPerson: CreateNaturalPersonDto;
}
