import { InputType, Field } from '@nestjs/graphql';
import { RecipeStep } from '../entities/recipe-step.entity';

@InputType()
export class CreateRecipeInput {
  @Field()
  name: string;

  @Field(() => [RecipeStep])
  steps: RecipeStep[];

  @Field()
  videoId: string;
}
