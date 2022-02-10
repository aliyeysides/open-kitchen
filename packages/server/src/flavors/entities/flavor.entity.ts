import { ObjectType, Field, GraphQLTimestamp } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Flavor {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => GraphQLTimestamp, { description: 'created at timestamp' })
  @Prop()
  created_at: Date;

  @Field(() => GraphQLTimestamp, { description: 'updated at timestamp' })
  @Prop()
  updated_at: Date;
}

export type FlavorDocument = Flavor & Document;

export const FlavorSchema = SchemaFactory.createForClass(Flavor);
