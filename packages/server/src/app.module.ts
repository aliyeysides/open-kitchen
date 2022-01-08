import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// CONTROLLERS
import { AppController } from './app.controller';

// SERVICES
import { AppService } from './app.service';

// DOMAIN MODULES
import { FlavorsModule } from './flavors/flavors.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipesModule } from './recipes/recipes.module';
import { VideoUploadsModule } from './video-uploads/video-uploads.module';
import { AwsS3UploaderModule } from './aws-s3-uploader/aws-s3-uploader.module';
import { ThumbnailsModule } from './thumbnails/thumbnails.module';
import config from './config/config';

// MIDDLEWARE
import LoggerMiddleware from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot('mongodb://localhost/test'),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        fieldMiddleware: [LoggerMiddleware],
      },
    }),
    ServeStaticModule.forRoot({
      serveRoot: '',
      rootPath: join(__dirname, '../../client', 'build'),
      // exclude: ['/graphql*'],
    }),
    FlavorsModule,
    IngredientsModule,
    RecipesModule,
    VideoUploadsModule,
    AwsS3UploaderModule,
    ThumbnailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [MongooseModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
