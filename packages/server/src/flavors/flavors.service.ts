import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFlavorInput } from './dto/create-flavor.input';
import { UpdateFlavorInput } from './dto/update-flavor.input';
import { Flavor, FlavorDocument } from './entities/flavor.entity';

@Injectable()
export class FlavorsService {
  constructor(
    @InjectModel(Flavor.name) private flavorsModel: Model<FlavorDocument>,
  ) {}

  create(createFlavorInput: CreateFlavorInput) {
    const createdFlavors = new this.flavorsModel(createFlavorInput);
    return createdFlavors.save();
  }

  findAll() {
    return this.flavorsModel.find().exec();
  }

  findOne(id: string) {
    return this.flavorsModel.findOne({ _id: id }).exec();
  }

  update(id: number, updateFlavorInput: UpdateFlavorInput) {
    return `This action updates a #${id} flavor`;
  }

  remove(id: number) {
    return `This action removes a #${id} flavor`;
  }
}
