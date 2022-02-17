import request from 'supertest';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { ConfigService } from 'aws-sdk';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleRef.createNestApplication();
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
