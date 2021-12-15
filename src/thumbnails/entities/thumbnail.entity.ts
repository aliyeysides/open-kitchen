import { ObjectType, Field, GraphQLTimestamp } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Thumbnail {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  url: string;

  @Field(() => GraphQLTimestamp)
  @Prop()
  created_at: Date;

  @Field(() => GraphQLTimestamp)
  @Prop()
  updated_at: Date;
}

export type ThumbnailDocument = Thumbnail & Document;

export const ThumbnailSchema = SchemaFactory.createForClass(Thumbnail);
