import { ObjectType, Field, GraphQLTimestamp } from '@nestjs/graphql';
import { VideoUpload } from '../../video-uploads/entities/video-upload.entity';

@ObjectType()
export class Recipe {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  video: VideoUpload; // todo: might need to be a VideoUpload type

  @Field(() => GraphQLTimestamp)
  created_at: Date;

  @Field(() => GraphQLTimestamp)
  updated_at: Date;
}
