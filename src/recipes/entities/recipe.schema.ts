import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { VideoUpload } from '../../video-uploads/entities/video-upload.schema';

export type RecipeDocument = Recipe & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Recipe {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: 'VideoUpload',
  })
  videoId: VideoUpload;

  // steps[], ordered list

  // ingredients[]
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
