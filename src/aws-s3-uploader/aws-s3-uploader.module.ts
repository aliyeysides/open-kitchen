import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsS3UploaderService } from './aws-s3-uploader.service';

@Global()
@Module({
  providers: [AwsS3UploaderService, ConfigService],
  exports: [AwsS3UploaderService],
})
export class AwsS3UploaderModule {
  constructor(private awsS3UploaderService: AwsS3UploaderService) {}
}
