import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesResolver } from './recipes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './entities/recipe.entity';
import { SeederModule } from '../seeder/seeder.module';
import seed from '../seeder/data/recipes';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    SeederModule.forFeature({
      name: Recipe.name,
      load: seed,
    }),
  ],
  providers: [RecipesResolver, RecipesService],
})
export class RecipesModule {}
