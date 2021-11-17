import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { VideoUploadsResolver } from './video-uploads.resolver';
import { VideoUploadsService } from './video-uploads.service';
import { AwsS3UploaderService } from '../aws-s3-uploader/aws-s3-uploader.service';
import { getModelToken } from '@nestjs/mongoose';
import { VideoUploads } from './entities/video-uploads.schema';

const mockAwsS3UploaderService = {
  provide: AwsS3UploaderService,
  useValue: {},
};

const mockVideoUploadsResolver = {
  provide: VideoUploadsResolver,
  useValue: {},
};

const mockVideoUploadsService = {
  provide: VideoUploadsService,
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

describe('VideoUploadsResolver', () => {
  let resolver: VideoUploadsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        mockVideoUploadsResolver,
        mockVideoUploadsService,
        mockAwsS3UploaderService,
        mockConfigService,
        {
          provide: getModelToken(VideoUploads.name),
          useValue: {},
        },
      ],
    }).compile();

    resolver = await module.resolve<VideoUploadsResolver>(VideoUploadsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
