import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      ...createUserDto,
      profile: null,
    });
    return await this.usersRepository.save(user);
  }
  async login(loginUserDto: LoginUserDto) {
    var aux = await this.usersRepository.findOne({where: {email: loginUserDto.email, password: loginUserDto.password}, relations: ["profile"]});
    if(!aux){
      throw new NotFoundException(`Usuario #${loginUserDto.email} no encontrado`);
    }
    return aux;
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
