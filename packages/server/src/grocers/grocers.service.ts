import { Injectable } from '@nestjs/common';
import { CreateGrocerInput } from './dto/create-grocer.input';
import { UpdateGrocerInput } from './dto/update-grocer.input';

@Injectable()
export class GrocersService {
  create(createGrocerInput: CreateGrocerInput) {
    return 'This action adds a new grocer';
  }

  findAll() {
    return `This action returns all grocers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} grocer`;
  }

  update(id: number, updateGrocerInput: UpdateGrocerInput) {
    return `This action updates a #${id} grocer`;
  }

  remove(id: number) {
    return `This action removes a #${id} grocer`;
  }
}
