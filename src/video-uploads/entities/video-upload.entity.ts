import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class VideoUpload {
  @Field({ description: 'video upload file name' })
  name: string;
}
