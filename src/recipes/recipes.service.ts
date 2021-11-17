import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { Recipes, RecipesDocument } from './entities/recipes.schema';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipes.name) private recipesModel: Model<RecipesDocument>,
  ) {}

  create(createRecipeInput: CreateRecipeInput) {
    return this.recipesModel.create(createRecipeInput);
  }

  findAll() {
    return this.recipesModel.find().exec();
  }

  findOne(id: string) {
    return this.recipesModel.findOne({ _id: id }).exec();
  }

  update(id: number, updateRecipeInput: UpdateRecipeInput) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
