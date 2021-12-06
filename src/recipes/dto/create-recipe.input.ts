import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRecipeInput {
  @Field()
  name: string;

  @Field()
  videoId: string;
}
