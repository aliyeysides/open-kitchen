import request from 'supertest';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import SeederService from '../src/seeder/seeder.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  }, 1000);

  it('GET /healthcheck should return 200', async () => {
    const server = await app.getHttpServer();
    return request(server).get('/healthcheck').expect(200);
  });
});
