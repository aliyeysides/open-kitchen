import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlavorsDocument = Flavors & Document;

@Schema()
export class Flavors {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Date, required: true })
  updated: Date;
}

export const FlavorsSchema = SchemaFactory.createForClass(Flavors);
