import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeNameInput } from './dto/change-name.input';
import { User, UserDocument } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userID, user): Promise<User> {
    const newUser = await this.userModel.create({
      user_id: userID,
      user: user,
    });
    return newUser;
  }

  async getByUserID(userID): Promise<User> {
    const user = await this.userModel.findOne({ user_id: userID }).exec();
    return user;
  }

  async editUser(id, userID, changeUserInput: ChangeNameInput): Promise<User> {
    const editedUser = await this.userModel.findByIdAndUpdate(
      id,
      { userID: userID, name: changeUserInput.name },
      { new: true },
    );
    return editedUser;
  }
  //   async deleteNickname(postID): Promise<any> {
  //     const deleteNick = await this.userModel.findByIdAndDelete(postID);
  //     return deleteNick;
  //   }
}
