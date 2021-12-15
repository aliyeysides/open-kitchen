import { Test, TestingModule } from '@nestjs/testing';
import { ThumbnailsResolver } from './thumbnails.resolver';
import { ThumbnailsService } from './thumbnails.service';

describe('ThumbnailsResolver', () => {
  let resolver: ThumbnailsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThumbnailsResolver, ThumbnailsService],
    }).compile();

    resolver = module.get<ThumbnailsResolver>(ThumbnailsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
