import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AwsS3UploaderService } from '../aws-s3-uploader/aws-s3-uploader.service';
import { VideoUpload } from './entities/video-upload.entity';
import { VideoUploadsService } from './video-uploads.service';

describe('VideoUploadsService', () => {
  let service: VideoUploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AwsS3UploaderService,
          useValue: {},
        },
        {
          provide: getModelToken(VideoUpload.name),
          useValue: {},
        },
        VideoUploadsService,
      ],
    }).compile();

    service = module.get<VideoUploadsService>(VideoUploadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
