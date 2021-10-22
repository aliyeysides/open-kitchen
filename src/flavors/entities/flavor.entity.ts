import { ObjectType, Field, GraphQLTimestamp } from '@nestjs/graphql';

@ObjectType()
export class Flavor {
  @Field({ description: 'flavor name' })
  name: string;

  @Field(() => GraphQLTimestamp, { description: 'updated at timestamp' })
  updated: Date;
}
