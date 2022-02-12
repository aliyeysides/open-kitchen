import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsResolver } from './ingredients.resolver';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientsService } from './ingredients.service';
import { useMock } from '../../test/utils';

describe('IngredientsResolver', () => {
  let resolver: IngredientsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientsResolver,
        useMock({ provide: IngredientsService }),
        useMock({ model: Ingredient }),
      ],
    }).compile();

    resolver = module.get<IngredientsResolver>(IngredientsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
