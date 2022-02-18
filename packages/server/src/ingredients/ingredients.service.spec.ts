import { Test, TestingModule } from '@nestjs/testing';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientsService } from './ingredients.service';
import { useMock } from '../../test/utils';

describe('IngredientsService', () => {
  let service: IngredientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: IngredientsService, useValue: {} },
        useMock({ model: Ingredient }),
      ],
    }).compile();

    service = module.get<IngredientsService>(IngredientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
