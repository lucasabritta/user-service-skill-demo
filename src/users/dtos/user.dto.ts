export interface CreateUserDto {
    name: string;
    email: string;
}

export interface UpdateUserDto {
    name?: string;
    email?: string;
}

export interface ListUsersQueryDto {
    created?: 'asc' | 'desc';
}

export interface DeleteUserParamsDto {
    userId: string;
}

export interface UpdateUserParamsDto {
    userId: string;
}
