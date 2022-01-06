import { Test, TestingModule } from '@nestjs/testing';
import { ThumbnailsService } from './thumbnails.service';

const mockThumbnailsService = {
  provide: ThumbnailsService,
  useValue: {},
};

describe('ThumbnailsService', () => {
  let service: ThumbnailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [mockThumbnailsService],
    }).compile();

    service = module.get<ThumbnailsService>(ThumbnailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
