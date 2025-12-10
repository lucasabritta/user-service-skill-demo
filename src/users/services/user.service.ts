import { SortOrder } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { CreateUserDto, ListUsersQueryDto, UpdateUserDto } from '../dtos/user.dto';
import { UserRepository } from '../repository/user.repository';

const repo = new UserRepository();

export async function createUser(data: CreateUserDto) {
    if (!data.name) {
        throw { status: 400, message: 'The attribute "name" is required' };
    }

    if (!data.email) {
        throw { status: 400, message: 'The attribute "email" is required' };
    }

    if (!isEmail(data.email)) {
        throw { status: 400, message: 'Invalid email format' };
    }

    return repo.create(data);
}

export async function listUsers(query: ListUsersQueryDto) {
    let sortValue: SortOrder = 1;

    if (query.created !== undefined) {
        if (query.created !== 'asc' && query.created !== 'desc') {
            throw { status: 400, message: 'created must be "asc" or "desc"' };
        }
        sortValue = query.created === 'asc' ? 1 : -1;
    }

    return repo.list({ createdAt: sortValue });
}

export async function deleteUser(userId: string) {
    if (!userId) {
        throw { status: 400, message: 'The attribute "userId" is required' };
    }

    const deleted = await repo.delete(userId);

    if (!deleted) {
        throw { status: 404, message: 'User not found' };
    }

    return deleted;
}

export async function updateUser(userId: string, data: UpdateUserDto) {
    if (!userId) {
        throw { status: 400, message: 'The attribute "userId" is required' };
    }

    if (!data.name && !data.email) {
        throw { status: 400, message: 'At least one field must be provided' };
    }

    if (data.email) {
        if (!isEmail(data.email)) {
            throw { status: 400, message: 'Invalid email format' };
        }
        const existing = await repo.findByEmail(data.email, userId);
        if (existing && existing.id !== userId)
            throw { status: 400, message: 'Email already exists' };
    }

    const updated = await repo.update(userId, data);

    if (!updated) {
        throw { status: 404, message: 'User not found' };
    }

    return updated;
}
