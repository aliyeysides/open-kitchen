import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { FileUpload } from 'graphql-upload';
import { Model } from 'mongoose';
import { AwsS3UploaderService } from '../aws-s3-uploader/aws-s3-uploader.service';
import { Thumbnail, ThumbnailDocument } from './entities/thumbnail.entity';

@Injectable()
export class ThumbnailsService {
  constructor(
    @InjectModel(Thumbnail.name)
    private readonly thumbnailsModel: Model<ThumbnailDocument>,
    private readonly awsS3Uploader: AwsS3UploaderService,
    private readonly configService: ConfigService,
  ) {}

  async create(file: Promise<FileUpload>) {
    const config = this.configService.get('buckets');
    const upload = await this.awsS3Uploader.singleFileUploadResolver({
      file,
      bucket: config.thumbnails,
    });
    return this.thumbnailsModel.create({
      name: upload.filename,
      url: upload.url,
    });
  }

  findAll() {
    return `This action returns all thumbnails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} thumbnail`;
  }

  remove(id: number) {
    return `This action removes a #${id} thumbnail`;
  }
}
