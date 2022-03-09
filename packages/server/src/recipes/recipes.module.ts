import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesResolver } from './recipes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './entities/recipe.entity';
import { SeederModule } from '../seeder/seeder.module';
import seed from '../seeder/data/recipes';

const isDev = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    SeederModule.forFeature({
      name: Recipe.name,
      load: isDev ? seed : [],
    }),
  ],
  providers: [RecipesResolver, RecipesService],
  exports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
})
export class RecipesModule {}
