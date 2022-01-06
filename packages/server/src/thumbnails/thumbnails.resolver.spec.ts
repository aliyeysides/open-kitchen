import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AwsS3UploaderService } from '../aws-s3-uploader/aws-s3-uploader.service';
import { Thumbnail } from './entities/thumbnail.entity';
import { ThumbnailsResolver } from './thumbnails.resolver';
import { ThumbnailsService } from './thumbnails.service';

const mockAwsS3UploaderService = {
  provide: AwsS3UploaderService,
  useValue: {},
};

const mockThumbnailsResolver = {
  provide: ThumbnailsResolver,
  useValue: {},
};

const mockThumbnailService = {
  provide: ThumbnailsService,
  useValue: {},
};

describe('ThumbnailsResolver', () => {
  let resolver: ThumbnailsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        mockThumbnailsResolver,
        mockThumbnailService,
        mockAwsS3UploaderService,
        {
          provide: getModelToken(Thumbnail.name),
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<ThumbnailsResolver>(ThumbnailsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
