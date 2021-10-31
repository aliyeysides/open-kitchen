import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIngredientInput } from './dto/create-ingredient.input';
import { UpdateIngredientInput } from './dto/update-ingredient.input';
import { Ingredients, IngredientsDocument } from './ingredients.schema';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredients.name)
    private ingredientsModel: Model<IngredientsDocument>,
  ) {}

  create(createIngredientInput: CreateIngredientInput) {
    return this.ingredientsModel.create(createIngredientInput);
  }

  findAll() {
    return this.ingredientsModel.find().exec();
  }

  findOne(id: string) {
    return this.ingredientsModel.findOne({ _id: id }).exec();
  }

  update(id: number, updateIngredientInput: UpdateIngredientInput) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
