import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlavorsDocument = Flavors & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Flavors {
  @Prop({ required: true })
  name: string;
}

export const FlavorsSchema = SchemaFactory.createForClass(Flavors);
