import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateNameInput } from './create-name.input';

@InputType()
export class ChangeNameInput extends PartialType(CreateNameInput) {
  @Field()
  name: string;
}
