import { Module } from '@nestjs/common';
import { BondsService } from './bonds.service';
import { BondsController } from './bonds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bond } from './entities/bond.entity';
import { BondInfo } from './entities/bondCalculatorInfo.entity';
import { BondInput } from './entities/bondCalculatorInput.entity';
import { BondOutput } from './entities/bondCalculatorOutput.entity';
import { BondPublication } from './entities/bondPublication.entity';
import { ProfilesService } from 'src/profiles/profiles.service';

@Module({
  controllers: [BondsController],
  providers: [BondsService, ProfilesService],
  imports: [TypeOrmModule.forFeature([Bond,BondInfo,BondInput,BondOutput,BondPublication])],
})
export class BondsModule {}
