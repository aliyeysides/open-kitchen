import { Module } from '@nestjs/common';
import { FlavorsService } from './flavors.service';
import { FlavorsResolver } from './flavors.resolver';

@Module({
  providers: [FlavorsResolver, FlavorsService]
})
export class FlavorsModule {}
