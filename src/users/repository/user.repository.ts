import { User } from '../models/user.model';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { SortOrder, Types } from 'mongoose';

export class UserRepository {
    create(data: CreateUserDto) {
        return User.create(data);
    }

    findById(userId: string) {
        return User.findById(userId);
    }

    findByEmail(email: string, excludeUserId?: string | Types.ObjectId) {
        const filter: Record<string, unknown> = { email };

        if (excludeUserId) {
            filter._id = {
                $ne: excludeUserId,
            };
        }

        return User.findOne(filter);
    }

    update(userId: string, data: UpdateUserDto) {
        return User.findByIdAndUpdate(userId, data, { new: true });
    }

    delete(userId: string) {
        return User.findByIdAndDelete(userId);
    }

    list(sort: Record<string, SortOrder>) {
        return User.find().sort(sort);
    }
}
