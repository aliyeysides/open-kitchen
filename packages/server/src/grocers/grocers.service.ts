import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGrocerInput } from './dto/create-grocer.input';
import { UpdateGrocerInput } from './dto/update-grocer.input';
import { Grocer, GrocerDocument } from './entities/grocer.entity';

@Injectable()
export class GrocersService {
  constructor(
    @InjectModel(Grocer.name) private grocersModel: Model<GrocerDocument>,
  ) {}

  create(createGrocerInput: CreateGrocerInput) {
    return this.grocersModel.create(createGrocerInput);
  }

  findAll() {
    return this.grocersModel.find().exec();
  }

  findOne(id: number) {
    return this.grocersModel.findOne({ _id: id }).exec();
  }

  update(id: number, updateGrocerInput: UpdateGrocerInput) {
    return `This action updates a #${id} grocer`;
  }

  remove(id: number) {
    return `This action removes a #${id} grocer`;
  }
}
