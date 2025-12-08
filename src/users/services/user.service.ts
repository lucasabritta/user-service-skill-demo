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

export async function updateUser(params: any, data: any) {
    const { userId } = params;
    const { name, email } = data;

    if (!userId) {
        throw { status: 400, message: 'The attribute "userId" is required' };
    }

    if (!name && !email) {
        throw { status: 400, message: 'At least one field must be provided' };
    }

    if (email && !isEmail(email)) {
        throw { status: 400, message: 'Invalid email format' };
    }

    if (email) {
        const existing = await User.findOne({
            email,
            _id: { $ne: userId },
        });

        if (existing) {
            throw { status: 400, message: 'Email already exists' };
        }
    }

    const updated = await User.findByIdAndUpdate(
        userId,
        { ...(name && { name }), ...(email && { email }) },
        { new: true }
    );

    if (!updated) {
        throw { status: 404, message: 'User not found' };
    }

    return updated;
}
