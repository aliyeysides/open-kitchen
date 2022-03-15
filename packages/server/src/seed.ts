import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import SeederService from './seeder/seeder.service';

// Uncomment and run `npm run seed` to DROP and SEED the 'development' database
// import { Flavor } from './flavors/entities/flavor.entity';
// seed('development', Flavor.name, [{ name: 'testing flavor seeding' }]);

async function seed(dbName: string, modelName: string, seedData: any[]) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const seeder = app.get(SeederService);

  await seeder.seed(dbName, modelName, seedData);
  const PORT = config.get('port');

  await app.listen(PORT);
}
