import { Test, TestingModule } from '@nestjs/testing';
import { VideoUploadsService } from './video-uploads.service';

describe('VideoUploadsService', () => {
  let service: VideoUploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoUploadsService],
    }).compile();

    service = module.get<VideoUploadsService>(VideoUploadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
