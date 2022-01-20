import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsResolver } from './ingredients.resolver';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientsService } from './ingredients.service';

describe('IngredientsResolver', () => {
  let resolver: IngredientsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientsResolver,
        IngredientsService,
        {
          provide: getModelToken(Ingredient.name),
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<IngredientsResolver>(IngredientsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
