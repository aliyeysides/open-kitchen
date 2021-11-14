import { Module } from '@nestjs/common';
import { VideoUploadsService } from './video-uploads.service';
import { VideoUploadsResolver } from './video-uploads.resolver';
import { AwsS3UploaderService } from 'src/aws-s3-uploader/aws-s3-uploader.service';

@Module({
  providers: [VideoUploadsResolver, VideoUploadsService, AwsS3UploaderService],
})
export class VideoUploadsModule {}
