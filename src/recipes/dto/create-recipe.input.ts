import { InputType, Field } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class CreateRecipeInput {
  @Field()
  name: string;

  @Field()
  video: ObjectId;
}
