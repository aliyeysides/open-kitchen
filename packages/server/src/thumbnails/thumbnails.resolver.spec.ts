import { Test, TestingModule } from '@nestjs/testing';
import { useMock } from '../../test/utils';
import { AwsS3UploaderService } from '../aws-s3-uploader/aws-s3-uploader.service';
import { Thumbnail } from './entities/thumbnail.entity';
import { ThumbnailsResolver } from './thumbnails.resolver';
import { ThumbnailsService } from './thumbnails.service';

describe('ThumbnailsResolver', () => {
  let resolver: ThumbnailsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ThumbnailsResolver,
          useValue: {},
        },
        {
          provide: ThumbnailsService,
          useValue: {},
        },
        {
          provide: AwsS3UploaderService,
          useValue: {},
        },
        useMock({ model: Thumbnail }),
      ],
    }).compile();

    resolver = module.get<ThumbnailsResolver>(ThumbnailsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
