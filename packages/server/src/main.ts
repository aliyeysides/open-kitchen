import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get('port');
  const basicAuth = require('express-basic-auth');

  app.use(
    basicAuth({
      users: { admin: 'girthelmurman' },
      challenge: true,
    }),
  );

  app.use(graphqlUploadExpress());
  await app.listen(PORT);
}
bootstrap();
