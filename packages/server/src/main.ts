import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  console.log('config:::::', config);
  const PORT = config.get('port');
  console.log('PORT:::::::', PORT);
  app.use(graphqlUploadExpress());
  await app.listen(PORT);
}
bootstrap();
