import { NotFoundException, Req, Res, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlGuard } from '../auth/gql.guard';
import { JwtPayload } from '../auth/jwt-payload.decorator';
import { User } from './entity/user.entity';
import { ChangeUserInput } from './dto/change-user.input';
import { UserService } from './users.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlGuard)
  async getUser(@JwtPayload() payload) {
    const user = await this.userService.getByUserID(payload.sub);

    console.log('payload::::::', payload, 'user::::::::', user);
    if (!user) {
      throw new NotFoundException();
      // this.userService.createUser(payload);
    }
    return user;
  }

  @Mutation(() => User)
  @UseGuards(GqlGuard)
  createUser(@Args('user_id') user_id: string, @JwtPayload() payload) {
    console.log('HELLOOOOOO PAYLOAD:::::', payload);
    return;
  }

  @Mutation(() => User)
  @UseGuards(GqlGuard)
  async editUser(
    @Args('editUser') editUserInput: ChangeUserInput,
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
