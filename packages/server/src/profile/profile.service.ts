import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeNicknameInput } from './dto/change-nickname.input';
import { Nickname, NicknameDocument } from './entity/nickname.entity';

@Injectable()
export class NicknameService {
  constructor(
    @InjectModel(Nickname.name) private nicknameModel: Model<NicknameDocument>,
  ) {}

  async createNickname(userID, nickname): Promise<Nickname> {
    const newNickname = await this.nicknameModel.create({
      user_id: userID,
      nickname: nickname,
    });
    return newNickname;
  }

  async getByUserID(userID): Promise<Nickname> {
    const nickname = await this.nicknameModel
      .findOne({ user_id: userID })
      .exec();
    return nickname;
  }

  async editNickname(
    id,
    userID,
    changeNicknameInput: ChangeNicknameInput,
  ): Promise<Nickname> {
    const editedNickname = await this.nicknameModel.findByIdAndUpdate(
      id,
      { userID: userID, nickname: changeNicknameInput.nickname },
      { new: true },
    );
    return editedNickname;
  }
  //   async deleteNickname(postID): Promise<any> {
  //     const deleteNick = await this.nicknameModel.findByIdAndDelete(postID);
  //     return deleteNick;
  //   }
}
