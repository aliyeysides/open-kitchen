import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoUploadsService } from './video-uploads.service';
import { VideoUploadsResolver } from './video-uploads.resolver';
import { AwsS3UploaderService } from 'src/aws-s3-uploader/aws-s3-uploader.service';
import { VideoUploads, VideoUploadsSchema } from './video-uploads.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VideoUploads.name, schema: VideoUploadsSchema },
    ]),
  ],
  providers: [VideoUploadsResolver, VideoUploadsService, AwsS3UploaderService],
})
export class VideoUploadsModule {}
