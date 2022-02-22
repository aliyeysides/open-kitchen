import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateNicknameInput } from './create-nickname.input';

@InputType()
export class ChangeNicknameInput extends PartialType(CreateNicknameInput) {
  @Field()
  nickname: string;
}
