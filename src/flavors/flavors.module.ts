import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FlavorsService } from './flavors.service';
import { FlavorsResolver } from './flavors.resolver';
import { Flavor, FlavorSchema } from './entities/flavor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flavor.name, schema: FlavorSchema }]),
  ],
  providers: [FlavorsResolver, FlavorsService],
  exports: [MongooseModule],
})
export class FlavorsModule {}
