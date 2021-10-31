import { ObjectType, Field, GraphQLTimestamp } from '@nestjs/graphql';

@ObjectType()
export class Ingredient {
  @Field({ description: 'ingredient name' })
  name: string;

  @Field(() => GraphQLTimestamp, { description: 'created at timestamp' })
  created_at: Date;

  @Field(() => GraphQLTimestamp, { description: 'updated at timestamp' })
  updated_at: Date;
}
