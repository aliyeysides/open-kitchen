import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class VideoUpload {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
