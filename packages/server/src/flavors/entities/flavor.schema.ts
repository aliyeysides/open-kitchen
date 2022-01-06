import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlavorDocument = Flavor & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Flavor {
  @Prop({ required: true })
  name: string;
}

export const FlavorSchema = SchemaFactory.createForClass(Flavor);
