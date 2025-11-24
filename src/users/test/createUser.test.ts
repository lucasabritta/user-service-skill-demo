import request from 'supertest';
import { app } from '../../app';
import { User } from '../models/users.model';
import { describe, test, beforeEach, expect, jest } from '@jest/globals';

jest.mock('../models/users.model');

const mockedUser = User as any;

describe('Create users', () => {
  beforeEach(() => {
    jest.restoreAllMocks(); // reset all spies before each test
  });

  test('POST /users should return 201', async () => {
    // Spy on User.create and mock resolved value
    const fakeUser = {
      name: 'Lucas',
      email: 'lucas@example.com',
      _id: '1234567890',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    };

    mockedUser.create.mockResolvedValue(fakeUser);

    const response = await request(app)
      .post('/users')
      .send({ name: 'Lucas', email: 'lucas@example.com' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(fakeUser);
  });

  test('POST /users without name should return 400', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'lucas@example.com' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'The attribute "name" is required' });
  });

  test('POST /users without email should return 400', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Lucas' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'The attribute "email" is required' });
  });

  test('should return 500 if User.create throws an error', async () => {
    mockedUser.create.mockImplementation(() => {
      return Promise.reject(new Error('DB failure'));
    });

    const response = await request(app)
      .post('/users')
      .send({ name: 'Lucas', email: 'lucas@example.com' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
    expect(mockedUser.create).toHaveBeenCalledWith({
      name: 'Lucas',
      email: 'lucas@example.com',
    });
  });
});
