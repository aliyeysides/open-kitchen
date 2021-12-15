import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ThumbnailsService } from './thumbnails.service';
import { Thumbnail } from './entities/thumbnail.entity';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver(() => Thumbnail)
export class ThumbnailsResolver {
  constructor(private readonly thumbnailsService: ThumbnailsService) {}

  @Mutation(() => Thumbnail)
  createThumbnail(
    @Args('file', { type: () => GraphQLUpload })
    file: Promise<FileUpload>,
  ) {
    return this.thumbnailsService.create(file);
  }

  @Query(() => [Thumbnail], { name: 'thumbnails' })
  findAll() {
    return this.thumbnailsService.findAll();
  }

  @Query(() => Thumbnail, { name: 'thumbnail' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.thumbnailsService.findOne(id);
  }

  @Mutation(() => Thumbnail)
  removeThumbnail(@Args('id', { type: () => Int }) id: number) {
    return this.thumbnailsService.remove(id);
  }
}
