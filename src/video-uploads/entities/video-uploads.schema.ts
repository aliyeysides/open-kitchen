import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoUploadsDocument = VideoUploads & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class VideoUploads {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: '' })
  url: string;
}

export const VideoUploadsSchema = SchemaFactory.createForClass(VideoUploads);
