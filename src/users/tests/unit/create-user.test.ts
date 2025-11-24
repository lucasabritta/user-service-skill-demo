import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../models/user.model';
import { describe, test, expect, jest } from '@jest/globals';

jest.mock('../../models/users.model');

const mockedUser = User as any;

describe('Create Users', () => {
    test('returns 500 when User.create throws an error', async () => {
        mockedUser.create.mockRejectedValue(new Error('DB failure'));

        const response = await request(app)
            .post('/users')
            .send({ name: 'Lucas', email: 'lucas@example.com' });

        expect(response.status).toBe(500);
    });

    test('POST /users without name should return 400', async () => {
        const response = await request(app).post('/users').send({ email: 'lucas@example.com' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'The attribute "name" is required' });
    });

    test('POST /users without email should return 400', async () => {
        const response = await request(app).post('/users').send({ name: 'Lucas' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'The attribute "email" is required' });
    });
});
