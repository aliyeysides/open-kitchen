import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { VideoUploadsResolver } from './video-uploads.resolver';
import { VideoUploadsService } from './video-uploads.service';
import { AwsS3UploaderService } from '../aws-s3-uploader/aws-s3-uploader.service';
import { VideoUpload } from './entities/video-upload.entity';
import { useMock } from '../../test/utils';

describe('VideoUploadsResolver', () => {
  let resolver: VideoUploadsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: VideoUploadsResolver,
          useValue: {},
        },
        {
          provide: VideoUploadsService,
          useValue: {},
        },
        {
          provide: AwsS3UploaderService,
          useValue: {},
        },
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
        useMock({ model: VideoUpload }),
      ],
    }).compile();

    resolver = await module.resolve<VideoUploadsResolver>(VideoUploadsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
