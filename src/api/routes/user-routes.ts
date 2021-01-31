import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/user-controller';

const router: Router = Router();
const BASE_PATH: string = '/users';
const userController: UserController = UserController.getInstance();

const paths: { [key: string]: string } = {
    GETALL: '/',
    GET: '/get/:id',
    POST: '/create',
    PUT: '/update',
    DELETE: '/delete/:id',
};

// ROUTES
router.get(paths['GETALL'], userController.getAllUsers);
router.get(paths['GET'], userController.getUserById);
router.post(paths['POST'], userController.createUser);
router.put(paths['PUT'], userController.updateUser);
router.delete(paths['DELETE'], userController.deleteUser);

// URL NOT FOUND
router.all('/*', (req: Request, res: Response) => {
    res.status(404).send('URL não encontrada');
});

module.exports = (app) => app.use(BASE_PATH, router);