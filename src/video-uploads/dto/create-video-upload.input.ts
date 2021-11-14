import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVideoUploadInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
