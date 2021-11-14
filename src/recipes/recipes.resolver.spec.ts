import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { RecipesResolver } from './recipes.resolver';
import { Recipes } from './recipes.schema';
import { RecipesService } from './recipes.service';

describe('RecipesResolver', () => {
  let resolver: RecipesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesResolver,
        RecipesService,
        {
          provide: getModelToken(Recipes.name),
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<RecipesResolver>(RecipesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
