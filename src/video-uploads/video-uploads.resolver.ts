import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VideoUploadsService } from './video-uploads.service';
import { VideoUpload } from './entities/video-upload.entity';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { UpdateVideoUploadInput } from './dto/update-video-upload.input';
import { AwsS3UploaderService } from 'src/aws-s3-uploader/aws-s3-uploader.service';

@Resolver(() => VideoUpload)
export class VideoUploadsResolver {
  constructor(
    private readonly videoUploadsService: VideoUploadsService,
    private readonly awsS3Uploader: AwsS3UploaderService,
  ) {}

  @Mutation(() => VideoUpload)
  async createVideoUpload(
    @Args('file', { type: () => GraphQLUpload })
    file: Promise<FileUpload>,
  ) {
    const upload = await this.awsS3Uploader.singleFileUploadResolver({ file });
    return this.videoUploadsService.create(upload);
  }

  @Query(() => [VideoUpload], { name: 'videoUploads' })
  findAll() {
    return this.videoUploadsService.findAll();
  }

  @Query(() => VideoUpload, { name: 'videoUpload' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.videoUploadsService.findOne(id);
  }

  @Mutation(() => VideoUpload)
  updateVideoUpload(
    @Args('updateVideoUploadInput')
    updateVideoUploadInput: UpdateVideoUploadInput,
  ) {
    return this.videoUploadsService.update(
      updateVideoUploadInput.id,
      updateVideoUploadInput,
    );
  }

  @Mutation(() => VideoUpload)
  removeVideoUpload(@Args('id', { type: () => Int }) id: number) {
    return this.videoUploadsService.remove(id);
  }
}
