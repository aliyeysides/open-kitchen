import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VideoUploadsService } from './video-uploads.service';
import { VideoUpload } from './entities/video-upload.entity';
import { GraphQLUpload } from 'graphql-upload';
import { CreateVideoUploadInput } from './dto/create-video-upload.input';
import { UpdateVideoUploadInput } from './dto/update-video-upload.input';

@Resolver(() => VideoUpload)
export class VideoUploadsResolver {
  constructor(private readonly videoUploadsService: VideoUploadsService) {}

  @Mutation(() => VideoUpload)
  createVideoUpload(
    @Args('createVideoUploadInput', { type: () => GraphQLUpload })
    createVideoUploadInput: GraphQLUpload,
  ) {
    return this.videoUploadsService.create(createVideoUploadInput);
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
