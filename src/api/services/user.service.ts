import { IUserDataModel } from '../models/user.model';
import { UserRepository } from '../repositories/user-repository';

export class UserService {
    private static instance: UserService;

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    public async getAllUsers(): Promise<IUserDataModel[]> {
        const record: IUserDataModel[] = await UserRepository.getInstance().list();

        return record || [];
    }

    public async getUserById(userId: string): Promise<IUserDataModel> {
        const record: IUserDataModel = await UserRepository.getInstance().get(userId);

        return record;
    }

    public async createUser(user: IUserDataModel): Promise<{ [key: string]: any }> {
        // Validação dos dados do Usuário
        if (!UserRepository.getInstance().isValid(user)) {
            return { incompleteData: true };
        }

        // Validação de duplicidade de Usuário
        if (await UserRepository.getInstance().userExists(user)) {
            return { userExists: true };
        }

        const record = await UserRepository.getInstance().create(user);

        return record;
    }

    public async updateUser(user: IUserDataModel): Promise<{ [key: string]: any }> {
        // Validação de duplicidade de Usuário
        if (await UserRepository.getInstance().userExists(user)) {
            return { userExists: true };
        }

        const record = await UserRepository.getInstance().create(user);

        return record;
    }

    public async deleteUser(userId: string): Promise<any> {
        return await UserRepository.getInstance().delete(userId);
    }
}