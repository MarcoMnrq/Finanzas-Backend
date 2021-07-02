import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Role } from 'src/profiles/entities/role.enum';
import { EntityType } from 'src/legal-persons/entities/entity.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private profilesService: ProfilesService
  ) {}

  async create(createUserDto: CreateUserDto) {
    if( typeof createUserDto.legalPerson === 'undefined' && typeof createUserDto.naturalPerson === 'undefined'){
      return;
    }
    var user = await this.usersRepository.save({
      email: createUserDto.email,
      password: createUserDto.password,
      profile: null,
    });
    if(typeof createUserDto.legalPerson !== 'undefined'){
      user.profile = await this.profilesService.createLegalProfile(createUserDto.legalPerson,user);
    }
    else{
      user.profile = await this.profilesService.createNaturalProfile(createUserDto.naturalPerson,user);
    }
    return await this.usersRepository.save(user);
  }
  async login(loginUserDto: LoginUserDto) {
    var aux = await this.usersRepository.findOne({where: {email: loginUserDto.email, password: loginUserDto.password}, relations: ["profile","profile.legalPerson","profile.naturalPerson"]});
    if(!aux){
      throw new NotFoundException(`Usuario #${loginUserDto.email} no encontrado`);
    }
    var temp = {
      ...aux,
      role: null
    };
    if(aux.profile.legalPerson===null){
      temp.role = Role.NaturalPerson;
    }
    else{
      if(aux.profile.legalPerson.entity===EntityType.Empresa){
        temp.role = Role.Bussinness;
      }
      else{
        temp.role = Role.Institution;
      }
    }
    return temp;
  }
  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario #${id} no encontrado`);
    }
    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.delete(user);
  }
}
