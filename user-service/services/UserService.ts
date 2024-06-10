import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/connection';
import { sendMessage } from '../helpers/rabbitmq';
import { CREATE_USER_QUEUE, UPDATE_USER_QUEUE } from '../utils/constants';
import { IUser, IMessage } from '../interfaces';

export class UserService {
    private readonly userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    public async getAllUsers(skip: number, limit: number): Promise<(User[] | number)[]> {
        try {
            const [users, total] = await this.userRepository.findAndCount({
                skip,
                take: limit,
            });
            return [users, total];
        } catch (error) {
            console.error('Failed to get all users:', error);
            throw new Error('Failed to get all users');
        }
    }

    public async createUser(userData: Partial<IUser>): Promise<User> {
        try {
            const user = this.userRepository.create(userData);
            const createdUser = await this.userRepository.save(user);
            const message: IMessage = { userId: createdUser.id, newData: userData };

            await sendMessage(CREATE_USER_QUEUE, message);

            return createdUser;
        } catch (error) {
            console.error('Failed to create user:', error);
            throw new Error('Failed to create user');
        }
    }

    public async updateUser(id: string, userData: Partial<IUser>): Promise<User | null> {
        try {
            const user = await this.userRepository.findOneBy({ id });
            if (!user) {
                console.warn('User not found with id:', id);
                return null;
            }

            Object.assign(user, userData);
            const updatedUser = await this.userRepository.save(user);
            const message: IMessage = { userId: updatedUser.id, newData: userData };

            await sendMessage(UPDATE_USER_QUEUE, message);

            return updatedUser;
        } catch (error) {
            console.error(`Failed to update user with id ${id}:`, error);
            throw new Error('Failed to update user');
        }
    }
}

export default new UserService();
