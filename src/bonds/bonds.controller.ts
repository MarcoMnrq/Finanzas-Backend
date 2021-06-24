import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BondsService } from './bonds.service';
import { CreateBondDto } from './dto/create-bond.dto';
import { UpdateBondDto } from './dto/update-bond.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bonds')
@Controller('bonds')
export class BondsController {
  constructor(private readonly bondsService: BondsService) {}
  
  @Post()
  create(@Body() createBondDto: CreateBondDto) {
    return this.bondsService.create(createBondDto);
  }
  
  @Get()
  findAll() {
    return this.bondsService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bondsService.findOne(+id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBondDto: UpdateBondDto) {
    return this.bondsService.update(+id, updateBondDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bondsService.remove(+id);
  }
}

