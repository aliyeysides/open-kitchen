import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class RecipeStep {
  @Field(() => Int)
  order: number;

  @Field()
  instruction: string;
}
