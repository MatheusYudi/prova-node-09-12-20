import { UserRepository } from '../repositories/user-repository';
import { IUserDataModel } from '../../common/interfaces/user.interface';

export class UserService {
    private static instance: UserService;

    /**
     * Retorna a instância do Service
     */
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

        const record: IUserDataModel = await UserRepository.getInstance().create(user);

        return { _id: record['id'], name: record['name'], username: record['username'], email: record['email'] };
    }

    public async updateUser(user: IUserDataModel): Promise<{ [key: string]: any }> {
        // Validação dos dados do Usuário
        if (!UserRepository.getInstance().isValid(user)) {
            return { incompleteData: true };
        }

        // Validação de existência de Usuário
        if (!await UserRepository.getInstance().userExists(user['id'])) {
            return { userNotExists: true };
        }

        const record = await UserRepository.getInstance().update(user);

        return record;
    }

    public async deleteUser(userId: string): Promise<{ [key: string]: any }> {
        // Validação de existência de Usuário
        if (!await UserRepository.getInstance().userExists(userId)) {
            return { userNotExists: true };
        }

        const record = await UserRepository.getInstance().delete(userId);

        return record;
    }
}