import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Flavor {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
