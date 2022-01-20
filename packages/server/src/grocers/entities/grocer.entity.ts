import { ObjectType, Field, GraphQLTimestamp, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Grocer {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  @Prop({ required: true })
  state: string;

  @Field(() => String)
  @Prop({ required: true })
  city: string;

  @Field(() => Int)
  @Prop({ required: true })
  zip_code: number;

  @Field(() => String)
  @Prop({ required: true })
  address: string;

  @Field(() => GraphQLTimestamp)
  created_at: Date;

  @Field(() => GraphQLTimestamp)
  updated_at: Date;
}

export type GrocerDocument = Grocer & Document;

export const GrocerSchema = SchemaFactory.createForClass(Grocer);
