import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NaturalPersonsService } from './natural-persons.service';
import { CreateNaturalPersonDto } from './dto/create-natural-person.dto';
import { UpdateNaturalPersonDto } from './dto/update-natural-person.dto';

@Controller('natural-persons')
export class NaturalPersonsController {
  constructor(private readonly naturalPersonsService: NaturalPersonsService) {}

  @Post()
  create(@Body() createNaturalPersonDto: CreateNaturalPersonDto) {
    return this.naturalPersonsService.create(createNaturalPersonDto);
  }

  @Get()
  findAll() {
    return this.naturalPersonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.naturalPersonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNaturalPersonDto: UpdateNaturalPersonDto) {
    return this.naturalPersonsService.update(+id, updateNaturalPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.naturalPersonsService.remove(+id);
  }
}
