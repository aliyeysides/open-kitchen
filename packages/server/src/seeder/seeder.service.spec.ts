import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { useMock } from '../../test/utils';
import {
  COLLECTION_SEED_DATA,
  DEV_DATABASE,
  SEED_DB_NAME,
  SEED_MODEL_NAME,
} from './constants';
import SeederService from './seeder.service';

describe('Seeder Service', () => {
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getConnectionToken(), useValue: DEV_DATABASE },
        { provide: SeederService, useValue: {} },
        useMock({ model: { name: SEED_MODEL_NAME } }),
        { provide: COLLECTION_SEED_DATA, useValue: [] },
        { provide: SEED_DB_NAME, useValue: DEV_DATABASE },
      ],
    }).compile();

    service = module.get<SeederService>(SeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
