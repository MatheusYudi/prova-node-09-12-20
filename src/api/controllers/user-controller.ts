import { ObjectID } from 'mongodb';
import { Request, Response } from 'express';
import { IUserDataModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { USER_MESSAGES } from '../../common/constants/userMessages';

export class UserController {
    private static instance: UserController;

    /**
     * Retorna a instância do Controller
     */
    public static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }

        return UserController.instance;
    }

    /**
     * Recupera a lista de todos os Usuários
     * @param req Request do Cliente
     * @param res Resposta enviada ao Cliente
     */
    public async getAllUsers(req: Request, res: Response) {
        try {
            const usersList: IUserDataModel[] = await UserService.getInstance().getAllUsers();

            // Verificando a lista de usuários
            if (usersList.length > 0) {
                return res.status(200).send({ error: false, totalRecords: usersList.length, data: usersList });
            } else {
                return res.status(204).send(USER_MESSAGES.noRecords);
            }
        }
        catch (error) {
            console.log('error: ', error);
            return res.status(500).send({ error: true, message: 'Erro ao buscar os Usuários' });
        }
    }

    /**
     * Recupera um Usuário pelo seu ID
     * @param req Request do Cliente
     * @param res Resposta enviada ao Cliente
     */
    public async getUserById(req: Request, res: Response) {
        const userId: string = req.params['id'];

        try {
            // Validação do ID
            if (!ObjectID.isValid(userId)) {
                return res.status(400).send(USER_MESSAGES.invalidID);
            }

            const response: IUserDataModel = await UserService.getInstance().getUserById(userId);

            // Verificando a existência do usuário procurado
            if (response) {
                return res.status(200).send({ error: false, data: response });
            } else {
                return res.status(404).send(USER_MESSAGES.notFound);
            }
        }
        catch (error) {
            console.log('error: ', error);
            return res.status(500).send({ error: true, message: 'Erro ao buscar Usuário' });
        }
    }

    /**
     * Cria o registro de um novo Usuário
     * @param req Request do Cliente
     * @param res Resposta enviada ao Cliente
     */
    public async createUser(req: Request, res: Response) {
        const userData: IUserDataModel = req['body'];

        try {
            const response: any = await UserService.getInstance().createUser(userData);

            // Validação dos dados do Usuário
            if (response['incompleteData']) {
                return res.status(400).send(USER_MESSAGES.incompleteData);
            }

            // Validação de duplicidade de Usuário
            if (response['userExists']) {
                return res.status(409).send(USER_MESSAGES.alreadyExists);
            }

            return res.status(201).send({ ...USER_MESSAGES.create['success'], data: response });
        }
        catch (error) {
            console.log('error: ', error);
            return res.status(500).send(USER_MESSAGES.create['failure'])
        }
    }

    /**
     * Atualiza o registro de um Usuário
     * @param req Request do Cliente
     * @param res Resposta enviada ao Cliente
     */
    public async updateUser(req: Request, res: Response) {
        const userData: IUserDataModel = req['body'];

        try {
            // Validação do ID
            if (!userData['id'] || !ObjectID.isValid(userData['id'])) {
                return res.status(400).send(USER_MESSAGES.invalidID);
            }

            // Validação dos dados do Usuário
            if (!userData) {
                return res.status(400).send(USER_MESSAGES.incompleteData);
            }

            const response = await UserService.getInstance().updateUser(userData);

            // Validação de existência de Usuário
            if (!response['userExists']) {
                return res.status(404).send(USER_MESSAGES.notFound);
            }

            return res.status(200).send({ ...USER_MESSAGES.update['success'], data: response });
        }
        catch (error) {
            console.log('error: ', error);
            return res.status(500).send(USER_MESSAGES.update['failure']);
        }
    }

    /**
     * Exclui o registro de um Usuário
     * @param req Request do Cliente
     * @param res Resposta enviada ao Cliente
     */
    public async deleteUser(req: Request, res: Response) {
        const userId: string = req.params['id'];

        try {
            // Validação do ID
            if (!userId || !ObjectID.isValid(userId)) {
                return res.status(404).send(USER_MESSAGES.invalidID);
            }

            const response = await UserService.getInstance().deleteUser(userId);

            // Validação de existência de Usuário
            if (!response['userExists']) {
                return res.status(404).send(USER_MESSAGES.notFound);
            }

            return res.status(200).send(USER_MESSAGES.delete['success']);
        }
        catch (error) {
            console.log('error: ', error);
            return res.status(500).send(USER_MESSAGES.delete['failure']);
        }
    }
}