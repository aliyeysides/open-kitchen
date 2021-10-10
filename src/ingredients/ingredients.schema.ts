import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IngredientsDocument = Ingredients & Document;

@Schema()
export class Ingredients {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Date, required: true })
  updated: Date;
}

export const IngredientsSchema = SchemaFactory.createForClass(Ingredients);
