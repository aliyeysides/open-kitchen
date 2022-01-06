import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IngredientDocument = Ingredient & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Ingredient {
  @Prop({ required: true })
  name: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
