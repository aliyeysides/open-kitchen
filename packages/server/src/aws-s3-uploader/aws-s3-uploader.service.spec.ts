import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AwsS3UploaderService } from './aws-s3-uploader.service';

describe('AwsS3UploaderService', () => {
  let service: AwsS3UploaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AwsS3UploaderService, useValue: {} },
        {
          provide: ConfigService,
          useValue: {
            aws: {
              accessKeyId: 'process.env.AWS_ACCESS_KEY_ID',
              secretAccessKey: 'process.env.AWS_SECRET_ACCESS_KEY',
              destinationBucketName: 'videos',
            },
          },
        },
      ],
    }).compile();

    service = await module.resolve<AwsS3UploaderService>(AwsS3UploaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
