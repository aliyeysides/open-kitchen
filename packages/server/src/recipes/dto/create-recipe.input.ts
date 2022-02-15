import { InputType, Field, PickType } from '@nestjs/graphql';
import { RecipeStep } from '../entities/recipe-step.entity';
import { RecipeIngredient } from '../entities/recipe-ingredient.entity';
import { Recipe } from '../entities/recipe.entity';

@InputType()
export class CreateRecipeInput extends PickType(Recipe, [
  'name',
  'steps',
  'ingredients',
  'ytId',
]) {
  @Field(() => String)
  name: string;

  @Field(() => [RecipeStep])
  steps: RecipeStep[];

  @Field(() => [RecipeIngredient])
  ingredients: RecipeIngredient[];

  @Field(() => String)
  ytId: string;
}
