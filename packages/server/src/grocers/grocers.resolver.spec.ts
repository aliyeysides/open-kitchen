import { Test, TestingModule } from '@nestjs/testing';
import { GrocersResolver } from './grocers.resolver';
import { GrocersService } from './grocers.service';

describe('GrocersResolver', () => {
  let resolver: GrocersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrocersResolver, GrocersService],
    }).compile();

    resolver = module.get<GrocersResolver>(GrocersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
