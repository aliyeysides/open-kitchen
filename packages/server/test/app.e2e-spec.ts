import request from 'supertest';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await NestFactory.create(AppModule);
    await app.init();
  });

  it('/ (GET) should serve static assets', async () => {
    try {
      const server = app.getHttpServer();
      const response = await request(server).get('/');
      expect(response.statusCode).toEqual(200);
    } catch (e) {
      throw e;
    }
  });
});
