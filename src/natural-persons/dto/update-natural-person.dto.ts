import { PartialType } from '@nestjs/swagger';
import { CreateNaturalPersonDto } from './create-natural-person.dto';

export class UpdateNaturalPersonDto extends PartialType(CreateNaturalPersonDto) {}
