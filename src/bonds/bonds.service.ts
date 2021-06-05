import { Injectable } from '@nestjs/common';
import { CreateBondDto } from './dto/create-bond.dto';
import { UpdateBondDto } from './dto/update-bond.dto';

@Injectable()
export class BondsService {
  create(createBondDto: CreateBondDto) {
    return 'This action adds a new bond';
  }

  findAll() {
    return `This action returns all bonds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bond`;
  }

  update(id: number, updateBondDto: UpdateBondDto) {
    return `This action updates a #${id} bond`;
  }

  remove(id: number) {
    return `This action removes a #${id} bond`;
  }
}
