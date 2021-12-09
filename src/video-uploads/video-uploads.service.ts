import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileUpload } from 'graphql-upload';
import { Model } from 'mongoose';
import { AwsS3UploaderService } from '../aws-s3-uploader/aws-s3-uploader.service';

import {
  VideoUpload,
  VideoUploadDocument,
} from './entities/video-upload.entity';

@Injectable()
export class VideoUploadsService {
  constructor(
    @InjectModel(VideoUpload.name)
    private readonly videoUploadsModel: Model<VideoUploadDocument>,
    private readonly awsS3Uploader: AwsS3UploaderService,
  ) {}

  async create(file: Promise<FileUpload>) {
    const upload = await this.awsS3Uploader.singleFileUploadResolver({ file });
    return this.videoUploadsModel.create({
      name: upload.filename,
      url: upload.url,
    });
  }

  findAll() {
    return this.videoUploadsModel.find().exec();
  }

  findOne(id: string) {
    return this.videoUploadsModel.findOne({ _id: id }).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} videoUpload`;
  }
}
