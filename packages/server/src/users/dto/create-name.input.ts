import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNameInput {
  @Field()
  name: string;
}
