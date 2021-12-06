import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { Recipe, RecipeDocument } from './entities/recipe.schema';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipesModel: Model<RecipeDocument>,
  ) {}

  create(createRecipeInput: CreateRecipeInput) {
    return this.recipesModel.create(createRecipeInput);
  }

  findAll() {
    return this.recipesModel.find().populate('video').exec();
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
