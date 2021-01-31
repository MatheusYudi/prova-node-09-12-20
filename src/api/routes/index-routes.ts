import { Router, Request, Response } from 'express';

const router: Router = Router();
const BASE_PATH: string = '/';

router.get(`${BASE_PATH}`, (req: Request, res: Response) => {
    res.status(200).send(`
        <h1>Cadastro de Usuários<h1>
        <ol>PATHS:
            <li>GETALL: 'localhost:3000/users/'</li>
            <li>GET:    'localhost:3000/users/get/:id'</li>
            <li>POST:   'localhost:3000/users/create'</li>
            <li>PUT:    'localhost:3000/users/update'</li>
            <li>DELETE: 'localhost:3000/users/delete/:id'</li>
        </ol>
    `);
});

// URL NOT FOUND
router.all('*', (req: Request, res: Response) => {
    res.status(404).send('URL não encontrada');
});

module.exports = (app) => app.use(`${BASE_PATH}`, router);