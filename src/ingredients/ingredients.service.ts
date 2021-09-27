import { Injectable } from '@nestjs/common';
import { CreateIngredientInput } from './dto/create-ingredient.input';
import { UpdateIngredientInput } from './dto/update-ingredient.input';

@Injectable()
export class IngredientsService {
  create(createIngredientInput: CreateIngredientInput) {
    return 'This action adds a new ingredient';
  }

  findAll() {
    return `This action returns all ingredients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }

  update(id: number, updateIngredientInput: UpdateIngredientInput) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
