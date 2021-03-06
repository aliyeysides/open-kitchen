import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import config from './config/config';

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
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

// MIDDLEWARE
import LoggerMiddleware from './common/middleware/logger.middleware';
import { RecipesService } from './recipes/recipes.service';
import { SeederModule } from './seeder/seeder.module';

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
    SeederModule.forRoot(),
    AuthModule,
    MongooseModule.forRoot(dbUri),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        fieldMiddleware: [LoggerMiddleware],
      },
      playground: isDev ? true : false,
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
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, RecipesService],
  exports: [MongooseModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
