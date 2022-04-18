import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RecipesService } from './recipes.service';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Mutation(() => Recipe)
  createRecipe(
    @Args('createRecipeInput') createRecipeInput: CreateRecipeInput,
  ) {
    return this.recipesService.create(createRecipeInput);
  }

  @Query(() => [Recipe], { name: 'recipes' })
  findAll() {
    return this.recipesService.findAll();
  }

  @Query(() => Recipe, { name: 'recipe' })
  findOne(@Args('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Query(() => [Recipe], { name: 'recipesByTag' })
  findByTag(@Args('tag') tag: string) {
    return this.recipesService.findByTag(tag);
  }

  @Mutation(() => Recipe)
  updateRecipe(
    @Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput,
  ) {
    return this.recipesService.update(updateRecipeInput.id, updateRecipeInput);
  }

  @Mutation(() => Recipe)
  removeRecipe(@Args('id', { type: () => Int }) id: number) {
    return this.recipesService.remove(id);
  }
}
