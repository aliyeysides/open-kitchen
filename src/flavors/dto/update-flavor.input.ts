import { CreateFlavorInput } from './create-flavor.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFlavorInput extends PartialType(CreateFlavorInput) {
  @Field(() => Int)
  id: number;
}
