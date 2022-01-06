import { InputType, Field } from '@nestjs/graphql';
import { RecipeStep } from '../entities/recipe-step.entity';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateRecipeInput {
  @Field(() => String)
  name: string;

  @Field(() => [RecipeStep])
  steps: RecipeStep[];

  @Field(() => String)
  video: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  thumbnail: MongooseSchema.Types.ObjectId;
}
