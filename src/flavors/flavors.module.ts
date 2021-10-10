import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FlavorsService } from './flavors.service';
import { FlavorsResolver } from './flavors.resolver';
import { Flavors, FlavorsSchema } from './flavors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flavors.name, schema: FlavorsSchema }]),
  ],
  providers: [FlavorsResolver, FlavorsService],
  exports: [MongooseModule],
})
export class FlavorsModule {}
