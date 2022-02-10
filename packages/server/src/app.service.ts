import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SeederService from './seeder/seeder.service';
import IngredientsSeedData from './seeder/data/ingredients';
import RecipesSeedData from './seeder/data/recipes';
@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    // private readonly seederService: SeederService,
    private readonly config: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    // const isDev = this.config.get('node_env') === 'development';
    // if (isDev) {
    //   await this.seederService.seed('ingredients', IngredientsSeedData);
    //   // await this.seederService.seed('recipes', RecipesSeedData);
    // }
  }

  healthCheck(): number {
    return 200;
  }

  getVersion(): string {
    return process.env.npm_package_version;
  }
}
