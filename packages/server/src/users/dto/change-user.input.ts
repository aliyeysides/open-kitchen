import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class ChangeUserInput extends PartialType(CreateUserInput) {
  @Field()
  name: string;
}
