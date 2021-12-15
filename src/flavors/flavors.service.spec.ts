import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Flavor } from './entities/flavor.schema';
import { FlavorsService } from './flavors.service';

type ObjectId = string & { _brand: 'objectId' };

describe('FlavorsService', () => {
  let service: FlavorsService;

  const mockFlavorModel = () => {
    return {
      findOne: (id: ObjectId) => ({ _id: id }),
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlavorsService,
        {
          provide: getModelToken(Flavor.name),
          useValue: mockFlavorModel,
        },
      ],
    }).compile();

    service = module.get<FlavorsService>(FlavorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
