import { Test, TestingModule } from '@nestjs/testing';
import { VideoUploadsResolver } from './video-uploads.resolver';
import { VideoUploadsService } from './video-uploads.service';

describe('VideoUploadsResolver', () => {
  let resolver: VideoUploadsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoUploadsResolver, VideoUploadsService],
    }).compile();

    resolver = module.get<VideoUploadsResolver>(VideoUploadsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
