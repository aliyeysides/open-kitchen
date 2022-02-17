import { Test, TestingModule } from '@nestjs/testing';
import { useMock } from '../../test/utils';
import { Flavor } from './entities/flavor.entity';
import { FlavorsService } from './flavors.service';

type ObjectId = string & { _brand: 'objectId' };

describe('FlavorsService', () => {
  let service: FlavorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: FlavorsService, useValue: {} },
        useMock({ model: Flavor }),
      ],
    }).compile();

    service = module.get<FlavorsService>(FlavorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
