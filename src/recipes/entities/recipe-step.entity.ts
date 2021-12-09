import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@ObjectType()
@InputType('RecipeStepInput')
export class RecipeStep {
  @Field(() => Int)
  order: number;

  @Field(() => String)
  instruction: string;
}
