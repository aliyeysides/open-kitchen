import { InputType, Field } from '@nestjs/graphql';
import { RecipeStep } from '../entities/recipe-step.entity';
import { Schema as MongooseSchema } from 'mongoose';
import { GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateRecipeInput {
  @Field(() => String)
  name: string;

  @Field(() => [RecipeStep])
  steps: RecipeStep[];

  @Field(() => String)
  video: MongooseSchema.Types.ObjectId;

  @Field(() => GraphQLUpload)
  thumbnail: MongooseSchema.Types.Buffer;
}
