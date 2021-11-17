import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFlavorInput {
  @Field({ description: 'Example field (placeholder)' })
  name: string;
}
