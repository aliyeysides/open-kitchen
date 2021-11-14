import { Global, Module } from '@nestjs/common';
import { AwsS3UploaderService } from './aws-s3-uploader.service';

@Global()
@Module({
  providers: [
    AwsS3UploaderService,
    {
      provide: 'S3_UPLOAD_CONFIG',
      useValue: {
        accessKeyId: 'process.env.AWS_ACCESS_KEY_ID',
        secretAccessKey: 'process.env.AWS_SECRET_ACCESS_KEY',
        destinationBucketName: 'videos',
      },
    },
  ],
  exports: [
    AwsS3UploaderService,
    {
      provide: 'S3_UPLOAD_CONFIG',
      useValue: {
        accessKeyId: 'process.env.AWS_ACCESS_KEY_ID',
        secretAccessKey: 'process.env.AWS_SECRET_ACCESS_KEY',
        destinationBucketName: 'videos',
      },
    },
  ],
})
export class AwsS3UploaderModule {
  constructor(private awsS3UploaderService: AwsS3UploaderService) {}
}
