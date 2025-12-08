import { SortOrder } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { User } from '../models/user.model';

export async function createUser(data: any) {
    const { name, email } = data;

    if (!name) {
        throw { status: 400, message: 'The attribute "name" is required' };
    }

    if (!email) {
        throw { status: 400, message: 'The attribute "email" is required' };
    }

    if (!isEmail(email)) {
        throw { status: 400, message: 'Invalid email format' };
    }

    return User.create({ name, email });
}

export async function listUsers(query: any) {
    const created = query.created;
    let sortValue: SortOrder = 1;

    if (created !== undefined) {
        if (created !== 'asc' && created !== 'desc') {
            throw { status: 400, message: 'created must be "asc" or "desc"' };
        }
        sortValue = created === 'asc' ? 1 : -1;
    }

    return User.find().sort({ createdAt: sortValue });
}

export async function deleteUser(params: any) {
    const { userId } = params;

    if (!userId) {
        throw { status: 400, message: 'The attribute "userId" is required' };
    }

    const deleted = await User.findByIdAndDelete(userId);

    if (!deleted) {
        throw { status: 404, message: 'User not found' };
    }

    return deleted;
}
