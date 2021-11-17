import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileUpload } from 'graphql-upload';
import { Model } from 'mongoose';
import { AwsS3UploaderService } from '../aws-s3-uploader/aws-s3-uploader.service';
import { CreateVideoUploadInput } from './dto/create-video-upload.input';
import { UpdateVideoUploadInput } from './dto/update-video-upload.input';
import {
  VideoUploads,
  VideoUploadsDocument,
} from './entities/video-uploads.schema';

@Injectable()
export class VideoUploadsService {
  constructor(
    @InjectModel(VideoUploads.name)
    private readonly videoUploadsModel: Model<VideoUploadsDocument>,
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

  update(id: number, updateVideoUploadInput: UpdateVideoUploadInput) {
    return `This action updates a #${id} videoUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} videoUpload`;
  }
}
