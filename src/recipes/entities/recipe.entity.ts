import { ObjectType, Field, GraphQLTimestamp } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { VideoUpload } from '../../video-uploads/entities/video-upload.entity';
import { RecipeStep } from './recipe-step.entity';

@ObjectType()
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Recipe {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => VideoUpload)
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: VideoUpload.name,
  })
  video: VideoUpload | MongooseSchema.Types.ObjectId;

  @Field(() => [RecipeStep])
  @Prop()
  steps: RecipeStep[];

  @Field(() => GraphQLTimestamp)
  @Prop()
  created_at: Date;

  @Field(() => GraphQLTimestamp)
  @Prop()
  updated_at: Date;
}

export type RecipeDocument = Recipe & Document;

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
