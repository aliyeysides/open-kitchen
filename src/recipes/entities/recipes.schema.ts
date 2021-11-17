import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecipesDocument = Recipes & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Recipes {
  @Prop({ required: true })
  name: string;
}

export const RecipesSchema = SchemaFactory.createForClass(Recipes);
