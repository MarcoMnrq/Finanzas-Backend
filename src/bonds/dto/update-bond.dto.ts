import { PartialType } from '@nestjs/swagger';
import { CreateBondDto } from './create-bond.dto';

export class UpdateBondDto extends PartialType(CreateBondDto) {}
