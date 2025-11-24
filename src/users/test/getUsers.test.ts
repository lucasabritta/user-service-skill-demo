import request from 'supertest';
import { app } from '../../app';
import { User } from '../models/users.model';
import { describe, test, beforeEach, expect, jest } from '@jest/globals';

jest.mock('../models/users.model');
const mockedUser = User as any;

describe('GET /users', () => {
  const fakeUsers = [{ name: 'Alice' }, { name: 'Bob' }];

  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should return 200 and ascending sort when ?created=asc', async () => {
    const mockSort = jest.fn(() => Promise.resolve(fakeUsers));

    mockedUser.find.mockReturnValue({ sort: mockSort } as any);

    const response = await request(app).get('/users?created=asc');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(fakeUsers);
    expect(mockSort).toHaveBeenCalledWith({ createdAt: 1 });
  });

  test('should return 200 and descending sort when ?created=desc', async () => {
    const mockSort = jest.fn(() => Promise.resolve(fakeUsers));

    mockedUser.find.mockReturnValue({ sort: mockSort } as any);

    const response = await request(app).get('/users?created=desc');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(fakeUsers);
    expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
  });

  test('should return 200 and ascending sort by default', async () => {
    const mockSort = jest.fn(() => Promise.resolve(fakeUsers));
    mockedUser.find.mockReturnValue({ sort: mockSort } as any);

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(fakeUsers);
    expect(mockSort).toHaveBeenCalledWith({ createdAt: 1 });
  });

  test('should return 400 for invalid ?created value', async () => {
    const response = await request(app).get('/users?created=invalid');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'created must be "asc" or "desc"' });
  });

   test('should return 500 if User.find().sort() throws', async () => {
    const mockSort = jest.fn(() => Promise.reject(new Error('DB failure')));
    mockedUser.find.mockReturnValue({ sort: mockSort } as any);

    const response = await request(app).get('/users');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
    expect(mockSort).toHaveBeenCalledWith({ createdAt: 1 }); // default ascending
  });
});
