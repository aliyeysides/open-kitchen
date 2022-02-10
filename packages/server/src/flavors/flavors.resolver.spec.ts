import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FlavorsResolver } from './flavors.resolver';
import { Flavor } from './entities/flavor.entity';
import { FlavorsService } from './flavors.service';

describe('FlavorsResolver', () => {
  let resolver: FlavorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlavorsResolver,
        FlavorsService,
        {
          provide: getModelToken(Flavor.name),
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<FlavorsResolver>(FlavorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
