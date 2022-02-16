import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { RecipeIngredient } from './recipe-ingredient.entity';

@ObjectType()
@InputType('RecipeStepInput')
export class RecipeStep {
  @Field(() => Int)
  order: number;

  @Field(() => String)
  instruction: string;

  @Field(() => Int)
  startTime: number;

  @Field(() => [RecipeIngredient], { nullable: true })
  ingredients?: RecipeIngredient[];
}
