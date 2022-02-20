import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Nickname, NicknameSchema } from './entity/nickname.entity';
import { NickNameResolver } from './profile.resolver';
import { NicknameService } from './profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Nickname.name,
        schema: NicknameSchema,
      },
    ]),
  ],
  providers: [NickNameResolver, NicknameService],
})
export class NicknameModule {}
