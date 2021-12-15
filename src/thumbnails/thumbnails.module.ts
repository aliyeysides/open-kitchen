import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThumbnailsService } from './thumbnails.service';
import { ThumbnailsResolver } from './thumbnails.resolver';
import { Thumbnail, ThumbnailSchema } from './entities/thumbnail.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Thumbnail.name, schema: ThumbnailSchema },
    ]),
  ],
  providers: [ThumbnailsResolver, ThumbnailsService, ConfigService],
})
export class ThumbnailsModule {}
