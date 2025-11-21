import request from 'supertest';
import { app } from '../src';
import { describe, expect, test } from '@jest/globals';

describe('Server endpoints', () => {
  test('POST /users should return 201', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Lucas' });
    
    expect(response.status).toBe(201);
    expect(response.body).toEqual({});
  });

  test('GET /users should return 200 and an array', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
