import { ObjectType, Field, GraphQLTimestamp } from '@nestjs/graphql';
import { VideoUpload } from '../../video-uploads/entities/video-upload.entity';
import { RecipeStep } from './recipe-step.entity';

@ObjectType()
export class Recipe {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  video: VideoUpload;

  @Field(() => [RecipeStep])
  steps: RecipeStep[];

  @Field(() => GraphQLTimestamp)
  created_at: Date;

  @Field(() => GraphQLTimestamp)
  updated_at: Date;
}
