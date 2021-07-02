import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LegalPersonsService } from '../legal-persons/legal-persons.service';
import { NaturalPersonsService } from '../natural-persons/natural-persons.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    private legalPersonsService: LegalPersonsService,
    private naturalPersonsService: NaturalPersonsService,
    private usersService: UsersService
    ){}
  async create(createProfileDto: CreateProfileDto) {
    if( typeof createProfileDto.legalPerson === 'undefined' && typeof createProfileDto.naturalPerson === 'undefined'){
      return;
    }
    var user = await this.usersService.findOne(createProfileDto.userId);
    var profile = await this.profileRepository.create({
      user: user,
      legalPerson: null,
      naturalPerson: null
    });
    console.log(profile);
    //Aqui creamos también el profile que se vincula,
    if(typeof createProfileDto.legalPerson !== 'undefined'){
      //Creamos el profile de legalPerson
      profile.legalPerson = await this.legalPersonsService.create(createProfileDto.legalPerson);
    }
    else{
      console.log(createProfileDto.naturalPerson);
      profile.naturalPerson = await this.naturalPersonsService.create(createProfileDto.naturalPerson);
    }
    console.log(profile);
    return await this.profileRepository.save(profile);
  }

  async findAll() {
    return await this.profileRepository.find();
  }

  async findOne(id: number) {
    return await this.profileRepository.findOne(id=id);
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  async remove(id: number) {
    return await this.profileRepository.remove(await this.profileRepository.findOne(id=id));
  }
}
