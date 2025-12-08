import '../../../testing/setupDatabase';

import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../models/user.model';
import { describe, test, expect } from '@jest/globals';

describe('Delete users with real DB', () => {
    test('DELETE /users should return 200 and delete the user if id is valid', async () => {
        const user = await User.create({
            name: 'Lucas',
            email: 'lucas@example.com',
        });

        const response = await request(app).delete(`/users/${user._id}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(user._id.toString());

        const userInDb = await User.findById(user._id);
        expect(userInDb).toBeNull();
    });

    test('DELETE /users should return 404 when user does not exist', async () => {
        const fakeId = '507f1f77bcf86cd799439011';

        const response = await request(app).delete(`/users/${fakeId}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'User not found' });
    });
});
