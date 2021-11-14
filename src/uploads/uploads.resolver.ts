import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UploadsService } from './uploads.service';
import { Upload } from './entities/upload.entity';
import { CreateUploadInput } from './dto/create-upload.input';
import { UpdateUploadInput } from './dto/update-upload.input';

@Resolver(() => Upload)
export class UploadsResolver {
  constructor(private readonly uploadsService: UploadsService) {}

  @Mutation(() => Upload)
  createUpload(@Args('createUploadInput') createUploadInput: CreateUploadInput) {
    return this.uploadsService.create(createUploadInput);
  }

  @Query(() => [Upload], { name: 'uploads' })
  findAll() {
    return this.uploadsService.findAll();
  }

  @Query(() => Upload, { name: 'upload' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.uploadsService.findOne(id);
  }

  @Mutation(() => Upload)
  updateUpload(@Args('updateUploadInput') updateUploadInput: UpdateUploadInput) {
    return this.uploadsService.update(updateUploadInput.id, updateUploadInput);
  }

  @Mutation(() => Upload)
  removeUpload(@Args('id', { type: () => Int }) id: number) {
    return this.uploadsService.remove(id);
  }
}
