import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientInput } from './dto/create-ingredient.input';
import { UpdateIngredientInput } from './dto/update-ingredient.input';
import { FDCFood } from './entities/fdc-food.entity';

@Resolver(() => Ingredient)
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Mutation(() => Ingredient)
  createIngredient(
    @Args('createIngredientInput') createIngredientInput: CreateIngredientInput,
  ) {
    return this.ingredientsService.create(createIngredientInput);
  }

  @Query(() => [Ingredient], { name: 'ingredients' })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Query(() => Ingredient, { name: 'ingredient' })
  findOne(@Args('id') id: string) {
    return this.ingredientsService.findOne(id);
  }

  @Query(() => [FDCFood])
  search(@Args('query') q: string) {
    return this.ingredientsService.search(q, 'Foundation');
  }

  @Mutation(() => Ingredient)
  updateIngredient(
    @Args('updateIngredientInput') updateIngredientInput: UpdateIngredientInput,
  ) {
    return this.ingredientsService.update(
      updateIngredientInput.id,
      updateIngredientInput,
    );
  }

  @Mutation(() => Ingredient)
  removeIngredient(@Args('id', { type: () => Int }) id: number) {
    return this.ingredientsService.remove(id);
  }
}
