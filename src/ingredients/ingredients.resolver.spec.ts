import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsResolver } from './ingredients.resolver';
import { Ingredients } from './ingredients.schema';
import { IngredientsService } from './ingredients.service';

describe('IngredientsResolver', () => {
  let resolver: IngredientsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientsResolver,
        IngredientsService,
        {
          provide: getModelToken(Ingredients.name),
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
