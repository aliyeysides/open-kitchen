import { CreateVideoUploadInput } from './create-video-upload.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVideoUploadInput extends PartialType(
  CreateVideoUploadInput,
) {
  @Field(() => Int)
  id: number;
}
