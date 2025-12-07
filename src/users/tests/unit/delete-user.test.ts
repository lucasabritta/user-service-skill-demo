import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../models/user.model';
import { describe, test, expect, jest } from '@jest/globals';

jest.mock('../../models/user.model');

const mockedUser = User as any;

describe('Delete Users', () => {
    test('returns 500 when User.findByIdAndDelete throws an error', async () => {
        mockedUser.findByIdAndDelete.mockRejectedValue(new Error('DB failure'));

        const response = await request(app).delete('/users?id=123');

        expect(response.status).toBe(500);
    });

    test('DELETE /users without id should return 400', async () => {
        const response = await request(app).delete('/users');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'The attribute "id" is required' });
    });
});
