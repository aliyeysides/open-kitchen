import { Injectable } from '@nestjs/common';
import { CreateUploadInput } from './dto/create-upload.input';
import { UpdateUploadInput } from './dto/update-upload.input';

@Injectable()
export class UploadsService {
  create(createUploadInput: CreateUploadInput) {
    return 'This action adds a new upload';
  }

  findAll() {
    return `This action returns all uploads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadInput: UpdateUploadInput) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
