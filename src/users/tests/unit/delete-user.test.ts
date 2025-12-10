import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../models/user.model';
import { describe, test, expect, jest } from '@jest/globals';
import { deleteUser } from '../../services/user.service';

jest.mock('../../models/user.model');

const mockedUser = User as any;

describe('Delete Users', () => {
    test('returns 500 when User.findByIdAndDelete throws an error', async () => {
        mockedUser.findByIdAndDelete.mockRejectedValue(new Error('DB failure'));

        const response = await request(app).delete('/users/123');

        expect(response.status).toBe(500);
    });

    test('DELETE /users without userId should return 404 (route not found)', async () => {
        const response = await request(app).delete('/users');

        expect(response.status).toBe(404);
    });

    test('throws 400 when userId is missing', async () => {
        await expect(deleteUser('')).rejects.toEqual({
            status: 400,
            message: 'The attribute "userId" is required',
        });
    });
});
