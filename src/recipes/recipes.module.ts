import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesResolver } from './recipes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipes, RecipesSchema } from './entities/recipes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipes.name, schema: RecipesSchema }]),
  ],
  providers: [RecipesResolver, RecipesService],
})
export class RecipesModule {}
