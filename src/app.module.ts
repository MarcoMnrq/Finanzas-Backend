import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { NaturalPersonsModule } from './natural-persons/natural-persons.module';
import { LegalPersonsModule } from './legal-persons/legal-persons.module';
import { BondsModule } from './bonds/bonds.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, ProfilesModule, NaturalPersonsModule, LegalPersonsModule, BondsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
