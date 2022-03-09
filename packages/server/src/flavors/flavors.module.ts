import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FlavorsService } from './flavors.service';
import { FlavorsResolver } from './flavors.resolver';
import { Flavor, FlavorSchema } from './entities/flavor.entity';
import { SeederModule } from '../seeder/seeder.module';
import seed from '../seeder/data/flavors';

const isDev = process.env.NODE_ENV === 'development';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flavor.name, schema: FlavorSchema }]),
    SeederModule.forFeature({
      name: Flavor.name,
      load: isDev ? seed : [],
    }),
  ],
  providers: [FlavorsResolver, FlavorsService],
  exports: [MongooseModule],
})
export class FlavorsModule {}
