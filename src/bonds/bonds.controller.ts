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
import { CreatePublicationBondDto } from './dto/create-publication.dto';
import { SellPublicationBondDto } from './dto/sell-publication.dto';

@ApiTags('Bonds')
@Controller('bonds')
export class BondsController {
  constructor(private readonly bondsService: BondsService) {}
  
  @Post()
  create(@Body() createBondDto: CreatePublicationBondDto) {
    return this.bondsService.create(createBondDto);
  }
  @Post('sell/:bondid')
  sell(@Body() publication: SellPublicationBondDto, @Param('bondid') id: number){
    return this.bondsService.sell(publication, id)
  }
  @Get()
  findAll() {
    return this.bondsService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bondsService.findOne(+id);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bondsService.remove(+id);
  }
}

