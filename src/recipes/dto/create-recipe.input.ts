import { InputType, Field } from '@nestjs/graphql';
import { RecipeStep } from '../entities/recipe-step.entity';
import { RecipeStepInput } from './recipe-step.input';

@InputType()
export class CreateRecipeInput {
  @Field()
  name: string;

  @Field(() => [RecipeStepInput])
  steps: RecipeStep[];

  @Field()
  videoId: string;
}
