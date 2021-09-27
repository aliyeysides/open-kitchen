import { Resolver } from '@nestjs/graphql';
import { FlavorsService } from './flavors.service';

@Resolver()
export class FlavorsResolver {
  constructor(private readonly flavorsService: FlavorsService) {}
}
