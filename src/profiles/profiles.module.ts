import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalPersonsModule } from '../legal-persons/legal-persons.module';
import { NaturalPersonsModule } from '../natural-persons/natural-persons.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [TypeOrmModule.forFeature([Profile]),LegalPersonsModule,NaturalPersonsModule, UsersModule],
  exports: [ProfilesService]
})
export class ProfilesModule {

}
