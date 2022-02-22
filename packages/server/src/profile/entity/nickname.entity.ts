import { ObjectType, Field, GraphQLTimestamp } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Nickname {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  user_id: string;

  @Field(() => String)
  @Prop()
  nickname: string;

  @Field(() => GraphQLTimestamp)
  @Prop()
  created_at: Date;

  @Field(() => GraphQLTimestamp)
  @Prop()
  updated_at: Date;
}

export type NicknameDocument = Nickname & Document;
export const NicknameSchema = SchemaFactory.createForClass(Nickname);
