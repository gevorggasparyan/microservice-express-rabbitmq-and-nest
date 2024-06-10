import { Request, Response, NextFunction } from 'express';
import {UserService} from '../services';
import {IUser, PaginationGetAll} from "../interfaces";

class UserController {
    public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const page = parseInt(req.query.page as string, 10) || 1 as number;
            const limit = parseInt(req.query.limit as string, 10) || 10 as number;

            const skip = (page - 1) * limit as number;

            const [users, total] = await UserService.getAllUsers(skip, limit);
            const totalNumber = Number(total);

            const totalPages = Math.ceil(totalNumber / limit);

            res.json({
                users,
                pagination: {
                    page,
                    limit,
                    totalPages,
                } as PaginationGetAll,
            });
        } catch (error: any) {
            console.warn(error);
            next(error);
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            next(error);
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);

            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: any) {
            next(error);
        }
    }
}

export default new UserController();
