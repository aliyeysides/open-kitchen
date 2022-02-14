import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { useMock } from '../../test/utils';
import {
  COLLECTION_SEED_DATA,
  SEED_DB_NAME,
  SEED_MODEL_NAME,
} from './constants';
import SeederService from './seeder.service';

describe('Seeder Service', () => {
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getConnectionToken(), useValue: 'test' },
        useMock({ provide: SeederService }),
        useMock({ model: { name: SEED_MODEL_NAME } }),
        useMock({ provide: COLLECTION_SEED_DATA }),
        useMock({ provide: SEED_DB_NAME, val: 'test' }),
      ],
    }).compile();

    service = module.get<SeederService>(SeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
