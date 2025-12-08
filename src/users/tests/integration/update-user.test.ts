import '../../../testing/setupDatabase';

import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../models/user.model';
import { describe, test, expect } from '@jest/globals';

describe('Update users with real DB', () => {
    test('PUT /users/:userId should return 200 and update the user if valid data is provided', async () => {
        const userData = { name: 'Lucas', email: 'lucas@example.com' };

        const user = await User.create(userData);

        const response = await request(app)
            .put(`/users/${user._id}`)
            .send({ name: 'Lucas2', email: 'lucas2@example.com' });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Lucas2');
        expect(response.body.email).toBe('lucas2@example.com');
        expect(response.body.createdAt).toBeDefined();

        const userInDb = await User.findOne({ email: 'lucas2@example.com' });
        expect(userInDb).not.toBeNull();

        const previousUserInDb = await User.findOne({ email: 'lucas@example.com' });
        expect(previousUserInDb).toBeNull();
    });

    test('Should return error if non existing user is used', async () => {
        const userData = { name: 'Lucas', email: 'lucas@example.com' };
        const userData2 = { name: 'Lucas2', email: 'lucas2@example.com' };

        await User.create(userData);

        const response = await request(app).put(`/users/507f1f77bcf86cd799439011`).send(userData2);

        expect(response.body).toEqual({ error: 'User not found' });
        expect(response.status).toBe(404);
    });

    test('Should not update to an existing email', async () => {
        const userData = { name: 'Lucas', email: 'lucas@example.com' };
        const userData2 = { name: 'Lucas', email: 'lucas2@example.com' };

        const user = await User.create(userData);
        await User.create(userData2);

        const response = await request(app).put(`/users/${user._id}`).send(userData2);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Email already exists' });
    });
});
