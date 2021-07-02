import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LegalPersonsService } from './legal-persons.service';
import { CreateLegalPersonDto } from './dto/create-legal-person.dto';
import { UpdateLegalPersonDto } from './dto/update-legal-person.dto';
import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Legal Person')
// @Controller('legal-persons')
// export class LegalPersonsController {
//   constructor(private readonly legalPersonsService: LegalPersonsService) {}

//   @Post()
//   create(@Body() createLegalPersonDto: CreateLegalPersonDto) {
//     return this.legalPersonsService.create(createLegalPersonDto);
//   }

//   @Get()
//   findAll() {
//     return this.legalPersonsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.legalPersonsService.findOne(+id);
//   }

//   @Patch(':id')
//   update(
//     @Param('id') id: string,
//     @Body() updateLegalPersonDto: UpdateLegalPersonDto,
//   ) {
//     return this.legalPersonsService.update(+id, updateLegalPersonDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.legalPersonsService.remove(+id);
//   }
// }
