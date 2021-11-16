import { Global, Module } from '@nestjs/common';
import { AwsS3UploaderService } from './aws-s3-uploader.service';

@Global()
@Module({
  providers: [
    AwsS3UploaderService,
    {
      provide: 'S3_UPLOAD_CONFIG',
      useValue: {
        accessKeyId: '',
        secretAccessKey: '',
        destinationBucketName: 'foyir-videos',
      },
    },
  ],
  exports: [
    AwsS3UploaderService,
    {
      provide: 'S3_UPLOAD_CONFIG',
      useValue: {
        accessKeyId: '',
        secretAccessKey: '',
        destinationBucketName: 'foyir-videos',
      },
    },
  ],
})
export class AwsS3UploaderModule {
  constructor(private awsS3UploaderService: AwsS3UploaderService) {}
}
