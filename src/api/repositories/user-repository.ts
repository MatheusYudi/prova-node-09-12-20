import { Schema } from 'mongoose';
import { IUserDataModel } from '../models/user.model';

const User: Schema<IUserDataModel> = require('../models/user.model');

export class UserRepository {
    private static instance: UserRepository;
    private model: Schema<IUserDataModel>;

    private constructor() {
        this.model = User;
    }

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }

        return UserRepository.instance;
    }

    public async list(): Promise<IUserDataModel[]> {
        return await this.model.find({}, 'name email username');
    }

    public async get(userId: string): Promise<IUserDataModel> {
        return await this.model.findById(userId, 'name email username');
    }

    public async create(user: IUserDataModel): Promise<IUserDataModel> {
        return await this.model.create(user);
    }

    public async update(user: IUserDataModel): Promise<IUserDataModel> {    
        const { id, name, email, username } = user;

        return await this.model.findByIdAndUpdate(id, { name, email, username }, { new: true, projection: 'name email username' });
    }

    public async delete(userId: string): Promise<any> {
        return await this.model.deleteOne({ userId });
    }

    public async userExists(user: IUserDataModel): Promise<boolean> {
        const { username, email } = user;

        return await this.model.exists({ email, username });
    }

    public isValid(user: IUserDataModel): boolean {
        const required: string[] = ['name', 'email', 'username', 'password'];
 
        // Retorna false caso não exista nenhum dado ou algum dos obrigatórios falte
        if (!user || required.some((key: string) => !user[key])) {
            return false;
        }

        return true;
    }
}