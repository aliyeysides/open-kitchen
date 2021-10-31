import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IngredientsDocument = Ingredients & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Ingredients {
  @Prop({ required: true })
  name: string;
}

export const IngredientsSchema = SchemaFactory.createForClass(Ingredients);
