import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../models/user.model';
import { describe, test, expect, jest } from '@jest/globals';
import { updateUser } from '../../services/user.service';

jest.mock('../../models/user.model');

const mockedUser = User as any;

describe('Update Users', () => {
    test('returns 500 when User.update throws an error', async () => {
        mockedUser.findByIdAndUpdate.mockRejectedValue(new Error('DB failure'));

        const response = await request(app)
            .put('/users/:userId')
            .send({ name: 'Lucas', email: 'lucas@example.com' });

        expect(response.status).toBe(500);
    });

    test('PUT /users/:userId without value should return 400', async () => {
        const response = await request(app).put('/users/:userId').send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'At least one field must be provided' });
    });

    test('PUT /users/:userId with incorrect email should return 400', async () => {
        const response = await request(app)
            .put('/users/:userId')
            .send({ email: 'not-valid-email' });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid email format' });
    });

    test('throws 400 when userId is missing', async () => {
        await expect(updateUser({}, {})).rejects.toEqual({
            status: 400,
            message: 'The attribute "userId" is required',
        });
    });
});
