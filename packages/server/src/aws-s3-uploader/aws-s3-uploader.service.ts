import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';
import { ReadStream } from 'fs';
import stream from 'stream';

type S3UploadConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  destinationBucketName: string;
  region?: string;
};

type S3UploadStream = {
  writeStream: stream.PassThrough;
  promise: Promise<AWS.S3.ManagedUpload.SendData>;
};

export type File = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
};

export type UploadedFileResponse = {
  filename: string;
  mimetype: string;
  encoding: string;
  url: string;
};

export interface Uploader {
  singleFileUploadResolver: ({
    file,
    bucket,
  }: {
    file: Promise<File>;
    bucket: string;
  }) => Promise<UploadedFileResponse>;
}

@Injectable()
export class AwsS3UploaderService implements Uploader {
  private readonly _s3: AWS.S3;
  public config: S3UploadConfig;

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.get('aws');
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: config.region || 'us-east-1',
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });

    this._s3 = new AWS.S3();
    this.config = config;
  }

  private createUploadStream(key: string, bucket: string): S3UploadStream {
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: this._s3
        .upload({
          Bucket: bucket,
          Key: key,
          Body: pass,
        })
        .promise(),
    };
  }

  private createDestinationFilePath(
    fileName: string,
    mimetype: string,
    encoding: string,
  ): string {
    return `${Date.now()}-${mimetype}-${encoding}-${fileName}`;
  }

  async singleFileUploadResolver({
    file,
    bucket,
  }: {
    file: Promise<File>;
    bucket: string;
  }): Promise<UploadedFileResponse> {
    const { createReadStream, filename, mimetype, encoding } = await file;

    const readStream = createReadStream();

    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding,
    );

    const uploadStream = this.createUploadStream(filePath, bucket);

    readStream.pipe(uploadStream.writeStream);

    const result = await uploadStream.promise;
    const link = result.Location;

    return { filename, mimetype, encoding, url: link };
  }
}
