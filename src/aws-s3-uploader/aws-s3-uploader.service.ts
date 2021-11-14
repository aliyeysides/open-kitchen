import { Inject, Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';
import { ReadStream } from 'fs';

type S3UploadConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  destinationBucketName: string;
  region?: string;
};

export type File = {
  filename: string;
  mimetype: string;
  encoding: string;
  stream?: ReadStream;
};

export type UploadedFileResponse = {
  filename: string;
  mimetype: string;
  encoding: string;
  url: string;
};

export interface IUploader {
  singleFileUploadResolver: (
    parent,
    { file }: { file: Promise<File> },
  ) => Promise<UploadedFileResponse>;
}

@Injectable()
export class AwsS3UploaderService implements IUploader {
  private readonly _s3: AWS.S3;
  public config: S3UploadConfig;

  constructor(@Inject('S3_UPLOAD_CONFIG') config: S3UploadConfig) {
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: config.region || 'us-east-1',
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });

    this._s3 = new AWS.S3();
    this.config = config;
  }

  async singleFileUploadResolver({
    file,
  }: {
    file: Promise<File>;
  }): Promise<UploadedFileResponse> {
    // Todo next!
    return null;
  }
}
