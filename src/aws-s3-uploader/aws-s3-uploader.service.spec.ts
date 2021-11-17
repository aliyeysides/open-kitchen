import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AwsS3UploaderService } from './aws-s3-uploader.service';

const mockAwsS3UploaderService = {
  provide: AwsS3UploaderService,
  useValue: {},
};

const mockConfigService = {
  provide: ConfigService,
  useValue: {
    aws: {
      accessKeyId: 'process.env.AWS_ACCESS_KEY_ID',
      secretAccessKey: 'process.env.AWS_SECRET_ACCESS_KEY',
      destinationBucketName: 'videos',
    },
  },
};

describe('AwsS3UploaderService', () => {
  let service: AwsS3UploaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [mockAwsS3UploaderService, mockConfigService],
    }).compile();

    service = await module.resolve<AwsS3UploaderService>(AwsS3UploaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
