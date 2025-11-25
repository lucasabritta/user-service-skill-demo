import '../../../testing/setupDatabase';

import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../models/user.model';
import { describe, test, expect } from '@jest/globals';

describe('Create users with real DB', () => {
    test('POST /users should return 201 and store the user if valid data is provided', async () => {
        const response = await request(app)
            .post('/users')
            .send({ name: 'Lucas', email: 'lucas@example.com' });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Lucas');
        expect(response.body.email).toBe('lucas@example.com');

        const userInDb = await User.findOne({ email: 'lucas@example.com' });
        expect(userInDb).not.toBeNull();
    });

    test('POST /users should return 400 when email is invalid', async () => {
        const userData = { name: 'Lucas', email: 'not-an-email' };

        const response = await request(app).post('/users').send(userData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid email format' });
    });

    test('POST /users should return 400 when email already exists', async () => {
        const userData = { name: 'Lucas', email: 'lucas@example.com' };

        await User.create(userData);

        const response = await request(app).post('/users').send(userData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Email already exists' });
    });
});
