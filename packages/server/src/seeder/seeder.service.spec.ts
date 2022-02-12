import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { useMock } from '../../test/utils';
import { COLLECTION_SEED_DATA, SEED_MODEL_NAME } from './constants';
import SeederService from './seeder.service';

// @InjectConnection() private readonly connection: Connection,
// @Inject(SEED_MODEL_NAME) private readonly modelName: string,
// @Inject(COLLECTION_SEED_DATA) private readonly seedData: any[],
// private readonly config: ConfigService,

describe('Seeder Service', () => {
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        useMock({ provide: SeederService }),
        useMock({ model: { name: SEED_MODEL_NAME } }),
        useMock({ provide: COLLECTION_SEED_DATA }),
        useMock({ provide: ConfigService }),
      ],
    }).compile();

    service = module.get<SeederService>(SeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
