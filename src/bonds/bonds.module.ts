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
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  controllers: [BondsController],
  providers: [BondsService],
  imports: [TypeOrmModule.forFeature([Bond,BondInfo,BondInput,BondOutput,BondPublication]),ProfilesModule],
})
export class BondsModule {}
