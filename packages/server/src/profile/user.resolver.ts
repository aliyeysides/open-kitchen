import { NotFoundException, Req, Res, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlGuard } from '../auth/gql.guard';
import { CurrentUser } from '../auth/user.decorator';
import { User } from './entity/user.entity';
import { ChangeNameInput } from './dto/change-name.input';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(GqlGuard)
  async getUser(@CurrentUser() user) {
    console.log('user:::::', user);
    const u = await this.userService.getByUserID(user.sub);

    if (!u) {
      throw new NotFoundException();
    }
    return u;
  }

  @Mutation(() => User)
  @UseGuards(GqlGuard)
  createUser() {
    console.log('HELLOOOOOO:::::');
    return;
  }

  @Mutation(() => User)
  @UseGuards(GqlGuard)
  async editUser(
    @Args('editUser') editUserInput: ChangeNameInput,
    @CurrentUser() user,
  ) {
    const u = await this.userService.getByUserID(user.sub);
    // if no user, create new one
    if (!u) {
      return this.userService.createUser(user.sub, editUserInput.name);
    } else {
      return this.userService.editUser(user._id, user.sub, editUserInput);
    }
  }
}
