import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIngredientInput } from './dto/create-ingredient.input';
import { UpdateIngredientInput } from './dto/update-ingredient.input';
import { Ingredient, IngredientDocument } from './entities/ingredient.entity';
import axios from 'axios';
import { FDCDataType } from './entities/fdc-food.entity';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class IngredientsService {
  private readonly _config: { apiKey: string };

  constructor(
    @InjectModel(Ingredient.name)
    private ingredientsModel: Model<IngredientDocument>,
    private readonly configService: ConfigService,
  ) {
    this._config = this.configService.get('fdc');
  }

  create(createIngredientInput: CreateIngredientInput) {
    return this.ingredientsModel.create(createIngredientInput);
  }

  findAll() {
    return this.ingredientsModel.find().exec();
  }

  findOne(id: string) {
    return this.ingredientsModel.findOne({ _id: id }).exec();
  }

  async search(q: string, dataType: FDCDataType[]) {
    const {
      data: { foods },
    } = await axios(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${q}&dataType=${dataType}&api_key=${this._config.apiKey}`,
    );
    return foods;
  }

  update(id: number, updateIngredientInput: UpdateIngredientInput) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
