import express, { Request, Response } from 'express';
const Router = express.Router();

Router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Mortgage Payment Calculator app!');
});

module.exports = Router;