import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@InputType('RecipeIngredientInput')
export class RecipeIngredient {
  @Field(() => String)
  ingredient_id: MongooseSchema.Types.ObjectId;

  @Field(() => String, {
    description: 'unit of measurement (ounces, clove, tablespoon)',
  })
  unit: string;

  @Field(() => Int, {
    description: 'count of units of measurement (quantity x tablespoon)',
  })
  quantity: number;

  @Field(() => String, {
    description: 'process state (ground, minced, thawed)',
  })
  state: string;
}
