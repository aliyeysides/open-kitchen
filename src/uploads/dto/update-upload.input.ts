import { CreateUploadInput } from './create-upload.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUploadInput extends PartialType(CreateUploadInput) {
  @Field(() => Int)
  id: number;
}
