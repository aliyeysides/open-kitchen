import { Test, TestingModule } from '@nestjs/testing';
import { useMock } from '../../test/utils';
import { Recipe } from './entities/recipe.entity';
import { RecipesService } from './recipes.service';

describe('RecipesService', () => {
  let service: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: RecipesService, useValue: {} },
        useMock({ model: Recipe }),
      ],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
