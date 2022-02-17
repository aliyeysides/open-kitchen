import { Test, TestingModule } from '@nestjs/testing';
import { FlavorsResolver } from './flavors.resolver';
import { Flavor } from './entities/flavor.entity';
import { FlavorsService } from './flavors.service';
import { useMock } from '../../test/utils';

describe('FlavorsResolver', () => {
  let resolver: FlavorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: FlavorsResolver, useValue: {} },
        { provide: FlavorsService, useValue: {} },
        useMock({ model: Flavor }),
      ],
    }).compile();

    resolver = module.get<FlavorsResolver>(FlavorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
