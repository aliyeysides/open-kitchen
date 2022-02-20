import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

require('dotenv').config({
  path: '../../.env',
});

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
import { GrocersModule } from './grocers/grocers.module';
import config from './config/config';

// MIDDLEWARE
import LoggerMiddleware from './common/middleware/logger.middleware';
import { NicknameModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

const isDev =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// TODO: Clean up below using dynamic module providers
const devDb = 'mongodb://localhost/development';
const stagingDb = `mongodb+srv://${awsAccessKeyId}:${awsSecretAccessKey}@test-cluster-1.jfbye.mongodb.net/test-cluster-1?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority`;
const dbUri = isDev ? devDb : stagingDb;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
    MongooseModule.forRoot(dbUri),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        fieldMiddleware: [LoggerMiddleware],
      },
      // playground: isDev ? true : false, // TODO: uncommment when going live
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
    GrocersModule,
    NicknameModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [MongooseModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
