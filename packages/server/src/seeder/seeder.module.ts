import { DynamicModule, Module } from '@nestjs/common';
import SeederService from './seeder.service';

@Module({})
export class SeederModule {
  constructor() {}

  static forFeature(): DynamicModule {
    return {
      module: SeederModule,
      providers: [SeederService],
      exports: [SeederService],
    };
  }

  static forRoot(): DynamicModule {
    return {
      module: SeederModule,
      providers: [SeederService],
      exports: [SeederService],
    };
  }
}
