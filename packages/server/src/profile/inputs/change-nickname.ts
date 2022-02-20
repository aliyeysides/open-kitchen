import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChangeNicknameInput {
  @Field()
  nickname: string;
}
