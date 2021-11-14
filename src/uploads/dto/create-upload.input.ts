import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUploadInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
