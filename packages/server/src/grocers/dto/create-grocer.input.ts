import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGrocerInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  address: string;
}
