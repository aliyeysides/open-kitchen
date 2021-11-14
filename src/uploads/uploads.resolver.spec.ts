import { Test, TestingModule } from '@nestjs/testing';
import { UploadsResolver } from './uploads.resolver';
import { UploadsService } from './uploads.service';

describe('UploadsResolver', () => {
  let resolver: UploadsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadsResolver, UploadsService],
    }).compile();

    resolver = module.get<UploadsResolver>(UploadsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
