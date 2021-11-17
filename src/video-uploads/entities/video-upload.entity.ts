import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class VideoUpload {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  url: string;
}
