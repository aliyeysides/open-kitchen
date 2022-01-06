import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VideoUploadsService } from './video-uploads.service';
import { VideoUpload } from './entities/video-upload.entity';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver(() => VideoUpload)
export class VideoUploadsResolver {
  constructor(private readonly videoUploadsService: VideoUploadsService) {}

  @Mutation(() => VideoUpload)
  async createVideoUpload(
    @Args('file', { type: () => GraphQLUpload })
    file: Promise<FileUpload>,
  ) {
    return this.videoUploadsService.create(file);
  }

  @Query(() => [VideoUpload], { name: 'videoUploads' })
  findAll() {
    return this.videoUploadsService.findAll();
  }

  @Query(() => VideoUpload, { name: 'videoUpload' })
  findOne(@Args('id') id: string) {
    return this.videoUploadsService.findOne(id);
  }

  @Mutation(() => VideoUpload)
  removeVideoUpload(@Args('id', { type: () => Int }) id: number) {
    return this.videoUploadsService.remove(id);
  }
}
