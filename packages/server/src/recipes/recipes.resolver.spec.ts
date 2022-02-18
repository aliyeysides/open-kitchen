import { Test, TestingModule } from '@nestjs/testing';
import { RecipesResolver } from './recipes.resolver';
import { Recipe } from './entities/recipe.entity';
import { RecipesService } from './recipes.service';
import { useMock } from '../../test/utils';

describe('RecipesResolver', () => {
  let resolver: RecipesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: RecipesResolver, useValue: {} },
        { provide: RecipesService, useValue: {} },
        useMock({ model: Recipe }),
      ],
    }).compile();

    resolver = module.get<RecipesResolver>(RecipesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
