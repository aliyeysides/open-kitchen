import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsResolver } from './ingredients.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Ingredient, IngredientSchema } from './entities/ingredient.entity';
import { SeederModule } from '../seeder/seeder.module';
import seed from '../seeder/data/ingredients';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
    SeederModule.forFeature({
      name: Ingredient.name,
      load: seed,
    }),
  ],
  providers: [IngredientsResolver, IngredientsService],
  exports: [MongooseModule],
})
export class IngredientsModule {}
