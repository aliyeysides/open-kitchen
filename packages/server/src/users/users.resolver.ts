import { NotFoundException, Req, Res, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlGuard } from '../auth/gql.guard';
import { JwtPayload } from '../auth/jwt-payload.decorator';
import { User } from './entity/user.entity';
import { ChangeNameInput } from './dto/change-name.input';
import { UserService } from './users.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlGuard)
  async getUser(@JwtPayload() payload) {
    const user = await this.userService.getByUserID(payload.sub);

    if (!user) {
      throw new NotFoundException();
    }
    return user;
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
    @JwtPayload() payload,
  ) {
    const user = await this.userService.getByUserID(payload.sub);
    // if no user, create new one
    if (!user) {
      return this.userService.createUser(payload.sub, editUserInput.name);
    } else {
      return this.userService.editUser(payload._id, payload.sub, editUserInput);
    }
  }
}
