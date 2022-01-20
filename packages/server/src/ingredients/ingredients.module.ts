import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsResolver } from './ingredients.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Ingredient, IngredientSchema } from './entities/ingredient.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  providers: [IngredientsResolver, IngredientsService],
})
export class IngredientsModule {}
