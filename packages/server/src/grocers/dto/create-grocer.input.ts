import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateGrocerInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  city: string;

  @Field(() => Int)
  zip_code: number;

  @Field(() => String)
  address: string;
}
