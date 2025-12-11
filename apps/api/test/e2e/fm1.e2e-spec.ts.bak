import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { AppModule } from '../../src/app.module';

describe('FM-1 Core E2E', () => {
  let app: INestApplication;
  let server: any;
  let accessToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  }, 60_000); // 60s timeout for bootstrap

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('/api/health (GET) should return 200', async () => {
    const res = await request(server).get('/api/health');
    expect(res.status).toBe(200);
  });

  it('/api/auth/login (POST) superadmin should login', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'superadmin@murnova.com',
        password: 'SuperAdmin123!',
      });

    // Nest auth controller usually returns 200 or 201 depending on how it's built
    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');

    accessToken = res.body.accessToken;
  });

  it('/api/superadmin/dashboard (GET) should be accessible with token', async () => {
    const res = await request(server)
      .get('/api/superadmin/dashboard')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  it('/api/fm1-test/tenant-context (GET) should expose tenancy info', async () => {
    const res = await request(server)
      .get('/api/fm1-test/tenant-context')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('host');
    expect(res.body).toHaveProperty('schoolSlug');
  });
});
