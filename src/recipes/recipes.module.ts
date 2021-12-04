import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesResolver } from './recipes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './entities/recipe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  providers: [RecipesResolver, RecipesService],
})
export class RecipesModule {}
