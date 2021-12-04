import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoUploadsService } from './video-uploads.service';
import { VideoUploadsResolver } from './video-uploads.resolver';
import { AwsS3UploaderService } from '../aws-s3-uploader/aws-s3-uploader.service';
import { VideoUpload, VideoUploadSchema } from './entities/video-upload.schema';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VideoUpload.name, schema: VideoUploadSchema },
    ]),
  ],
  providers: [
    VideoUploadsResolver,
    VideoUploadsService,
    AwsS3UploaderService,
    ConfigService,
  ],
})
export class VideoUploadsModule {}
