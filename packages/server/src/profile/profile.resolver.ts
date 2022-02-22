import { NotFoundException, Req, Res, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlGuard } from '../auth/gql.guard';
import { CurrentUser } from '../auth/user.decorator';
import { Nickname, NicknameSchema } from './entity/nickname.entity';
import { ChangeNicknameInput } from './inputs/change-nickname';
import { NicknameService } from './profile.service';

@Resolver()
export class NickNameResolver {
  constructor(private readonly nicknameService: NicknameService) {}

  //   @Mutation(() => BlogPostType)
  //   async createBlogPost(
  //     @Args('creatBlogPostInput') createBlogPostInput: CreateBlogPostInput,
  //   ) {
  //     return this.blogPostService.create(createBlogPostInput);
  //   }

  @Query(() => Nickname, { name: 'nickname' })
  @UseGuards(GqlGuard)
  async getNickname(@CurrentUser() user) {
    const nickname = await this.nicknameService.getByUserID(user.sub);

    if (!nickname) {
      throw new NotFoundException();
    }
    return nickname;
  }

  @Mutation(() => Nickname)
  @UseGuards(GqlGuard)
  async editNickname(
    @Args('editNickname') editNicknameInput: ChangeNicknameInput,
    @CurrentUser() user,
  ) {
    const nickname = await this.nicknameService.getByUserID(user.sub);
    // if no nickname, create new one
    if (!nickname) {
      return this.nicknameService.createNickname(
        user.sub,
        editNicknameInput.nickname,
      );
    } else {
      return this.nicknameService.editNickname(
        nickname._id,
        user.sub,
        editNicknameInput,
      );
    }
  }
}
