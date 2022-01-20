import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GrocersService } from './grocers.service';
import { Grocer } from './entities/grocer.entity';
import { CreateGrocerInput } from './dto/create-grocer.input';
import { UpdateGrocerInput } from './dto/update-grocer.input';

@Resolver(() => Grocer)
export class GrocersResolver {
  constructor(private readonly grocersService: GrocersService) {}

  @Mutation(() => Grocer)
  createGrocer(@Args('createGrocerInput') createGrocerInput: CreateGrocerInput) {
    return this.grocersService.create(createGrocerInput);
  }

  @Query(() => [Grocer], { name: 'grocers' })
  findAll() {
    return this.grocersService.findAll();
  }

  @Query(() => Grocer, { name: 'grocer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.grocersService.findOne(id);
  }

  @Mutation(() => Grocer)
  updateGrocer(@Args('updateGrocerInput') updateGrocerInput: UpdateGrocerInput) {
    return this.grocersService.update(updateGrocerInput.id, updateGrocerInput);
  }

  @Mutation(() => Grocer)
  removeGrocer(@Args('id', { type: () => Int }) id: number) {
    return this.grocersService.remove(id);
  }
}
