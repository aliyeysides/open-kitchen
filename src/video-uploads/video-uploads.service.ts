import { Injectable } from '@nestjs/common';
import { CreateVideoUploadInput } from './dto/create-video-upload.input';
import { UpdateVideoUploadInput } from './dto/update-video-upload.input';

@Injectable()
export class VideoUploadsService {
  constructor() // todo
  {}

  create(createVideoUploadInput: CreateVideoUploadInput) {
    // return this.
  }

  findAll() {
    return `This action returns all videoUploads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videoUpload`;
  }

  update(id: number, updateVideoUploadInput: UpdateVideoUploadInput) {
    return `This action updates a #${id} videoUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} videoUpload`;
  }
}
