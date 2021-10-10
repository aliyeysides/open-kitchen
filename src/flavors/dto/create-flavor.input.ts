import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFlavorInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
