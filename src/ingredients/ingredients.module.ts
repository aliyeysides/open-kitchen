import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsResolver } from './ingredients.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Ingredients, IngredientsSchema } from './entities/ingredients.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ingredients.name, schema: IngredientsSchema },
    ]),
  ],
  providers: [IngredientsResolver, IngredientsService],
})
export class IngredientsModule {}
