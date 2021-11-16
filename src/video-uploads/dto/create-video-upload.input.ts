import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVideoUploadInput {
  @Field({ description: 'create video upload input' })
  filename: string;
}
