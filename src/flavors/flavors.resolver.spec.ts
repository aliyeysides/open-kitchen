import { Test, TestingModule } from '@nestjs/testing';
import { FlavorsResolver } from './flavors.resolver';
import { FlavorsService } from './flavors.service';

describe('FlavorsResolver', () => {
  let resolver: FlavorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlavorsResolver, FlavorsService],
    }).compile();

    resolver = module.get<FlavorsResolver>(FlavorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
