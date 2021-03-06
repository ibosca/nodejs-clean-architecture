import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth')
      .auth('britneyblankenship@quotezart.com', 'I<3Pizza!')
      .expect(201)
  });

  afterAll(async () => {
    await app.close();
  })
});
