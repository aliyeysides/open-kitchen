import { Test, TestingModule } from '@nestjs/testing';
import { useMock } from '../../test/utils';
import { GrocersService } from './grocers.service';

describe('GrocersService', () => {
  let service: GrocersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [useMock({ provide: GrocersService })],
    }).compile();

    service = module.get<GrocersService>(GrocersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
