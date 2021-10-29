import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FlavorsService } from './flavors.service';
import { Flavor } from './entities/flavor.entity';
import { CreateFlavorInput } from './dto/create-flavor.input';
import { UpdateFlavorInput } from './dto/update-flavor.input';

@Resolver(() => Flavor)
export class FlavorsResolver {
  constructor(private readonly flavorsService: FlavorsService) {}

  @Mutation(() => Flavor)
  createFlavor(
    @Args('createFlavorInput') createFlavorInput: CreateFlavorInput,
  ) {
    return this.flavorsService.create(createFlavorInput);
  }

  @Query(() => [Flavor], { name: 'flavors' })
  findAll() {
    return this.flavorsService.findAll();
  }

  @Query(() => Flavor, { name: 'flavor' })
  findOne(@Args('id') id: string) {
    return this.flavorsService.findOne(id);
  }

  @Mutation(() => Flavor)
  updateFlavor(
    @Args('updateFlavorInput') updateFlavorInput: UpdateFlavorInput,
  ) {
    return this.flavorsService.update(updateFlavorInput.id, updateFlavorInput);
  }

  @Mutation(() => Flavor)
  removeFlavor(@Args('id', { type: () => Int }) id: number) {
    return this.flavorsService.remove(id);
  }
}
