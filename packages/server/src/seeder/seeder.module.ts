import { DynamicModule, Module } from '@nestjs/common';
import { COLLECTION_SEED_DATA, SEED_MODEL_NAME } from './constants';
import SeederService from './seeder.service';

export interface SeederModuleOptions {
  name: string;
  load: any[];
}

@Module({})
export class SeederModule {
  constructor() {}

  static forFeature({ name, load }: SeederModuleOptions): DynamicModule {
    return {
      module: SeederModule,
      providers: [
        SeederService,
        {
          provide: SEED_MODEL_NAME,
          useValue: name,
        },
        {
          provide: COLLECTION_SEED_DATA,
          useValue: load,
        },
      ],
      exports: [SeederService],
    };
  }
}