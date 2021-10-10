import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// CONTROLLERS
import { AppController } from './app.controller';

// SERVICES
import { AppService } from './app.service';

// DOMAIN MODULES
import { FlavorsModule } from './flavors/flavors.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    FlavorsModule,
    IngredientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [MongooseModule],
})
export class AppModule {}
