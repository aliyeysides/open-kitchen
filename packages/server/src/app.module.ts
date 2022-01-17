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

require('dotenv').config({
  path: '../../.env',
});

// MIDDLEWARE
import LoggerMiddleware from './common/middleware/logger.middleware';

const isDev = process.env.NODE_ENV === 'development';
console.log('IS_DEV?::::::', isDev);
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const localDb = 'mongodb://localhost/test';
const testDb = `mongodb+srv://${awsAccessKeyId}:${awsSecretAccessKey}@test-cluster-1.jfbye.mongodb.net/test-cluster-1?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority`;
const dbUri = isDev ? localDb : testDb;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot(dbUri),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        fieldMiddleware: [LoggerMiddleware],
      },
      // playground: isDev ? true : false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../client', 'build'),
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
