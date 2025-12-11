import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, beforeAll, afterAll, expect } from "vitest";
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('ok');
        expect(res.body.info.database.status).toBe('up');
      });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Murnova Konect API is running!');
  });

  describe('Tenancy', () => {
    it('should resolve tenant from x-tenant header', () => {
      return request(app.getHttpServer())
        .get('/schools/slug/demo-academy')
        .set('x-tenant', 'demo-academy')
        .expect(200);
    });
  });
});
