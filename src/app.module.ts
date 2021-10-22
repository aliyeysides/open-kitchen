import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

// CONTROLLERS
import { AppController } from './app.controller';

// SERVICES
import { AppService } from './app.service';

// DOMAIN MODULES
import { FlavorsModule } from './flavors/flavors.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    MongooseModule.forRoot('mongodb://localhost/test'),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    FlavorsModule,
    IngredientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [MongooseModule],
})
export class AppModule {}
