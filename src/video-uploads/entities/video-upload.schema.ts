import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoUploadDocument = VideoUpload & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class VideoUpload {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: '' })
  url: string;
}

export const VideoUploadSchema = SchemaFactory.createForClass(VideoUpload);
