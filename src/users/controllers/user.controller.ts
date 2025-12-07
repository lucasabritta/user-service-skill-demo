import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/user.service';

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).send(user);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).send({ error: 'Email already exists' });
        }
        next(err);
    }
}

export async function listUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await UserService.listUsers(req.query);
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await UserService.deleteUser(req.params);
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
}
