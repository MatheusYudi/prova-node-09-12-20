import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send("<h1>Prova Backend Helpper<h1>");
});

router.all('/*', (req: Request, res: Response) => {
    res.status(404).send('URL não encontrada');
});

module.exports = (app) => app.use('/', router);