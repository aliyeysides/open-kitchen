import { InputType, Field, Int } from '@nestjs/graphql';
import { RecipeStep } from '../entities/recipe-step.entity';

@InputType()
export class RecipeStepInput implements RecipeStep {
  @Field(() => Int)
  order: number;

  @Field()
  instruction: string;
}
