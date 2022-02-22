import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNicknameInput {
  @Field()
  nickname: string;
}
