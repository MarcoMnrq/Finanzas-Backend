import { Module } from '@nestjs/common';
import { BondsService } from './bonds.service';
import { BondsController } from './bonds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bond } from './entities/bond.entity';
import { BondInfo } from './entities/bondinfo.entity';

@Module({
  controllers: [BondsController],
  providers: [BondsService],
  imports: [TypeOrmModule.forFeature([Bond,BondInfo])],
})
export class BondsModule {}
