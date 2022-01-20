import { CreateGrocerInput } from './create-grocer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGrocerInput extends PartialType(CreateGrocerInput) {
  @Field(() => Int)
  id: number;
}
