import { Module } from '@nestjs/common';
import { BondsService } from './bonds.service';
import { BondsController } from './bonds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bond } from './entities/bond.entity';
import { BondCalculatorInfo } from './entities/bondCalculatorInfo.entity';
import { BondCalculatorInput } from './entities/bondCalculatorInput.entity';
import { BondCalculatorOutput } from './entities/bondCalculatorOutput.entity';

@Module({
  controllers: [BondsController],
  providers: [BondsService],
  imports: [TypeOrmModule.forFeature([Bond,BondCalculatorInfo,BondCalculatorInput,BondCalculatorOutput])],
})
export class BondsModule {}
