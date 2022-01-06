import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFlavorInput {
  @Field()
  name: string;
}
