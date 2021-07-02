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
    if(createProfileDto.legalPerson === null && createProfileDto.naturalPerson === null){
      return;
    }
    var user = await this.usersService.findOne(createProfileDto.userId);
    var profile = await this.profileRepository.create({
      user: user,
      legalPerson: null,
      naturalPerson: null
    })
    //Aqui creamos también el profile que se vincula,
    if(createProfileDto.legalPerson != null){
      //Creamos el profile de legalPerson
      profile.legalPerson = await this.legalPersonsService.create(createProfileDto.legalPerson);
    }
    else{
      profile.naturalPerson = await this.naturalPersonsService.create(createProfileDto.naturalPerson);
    }
    return await this.profileRepository.save(createProfileDto);
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
