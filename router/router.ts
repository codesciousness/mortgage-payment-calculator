import express, { Request, Response } from 'express';
const Router = express.Router();
const { v4: uuidv4 } = require('uuid');

Router.post('/loans', async (req: Request, res: Response) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send('Please provide a name and email address.');
    }
    const loanId = uuidv4();
    const loan = { loanId, ...req.body }
    const loans = req.app.locals.mongo.loans;
    try {
        const response = await loans.addLoan(loan);
        return res.send(response);
    }
    catch (err) {
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = Router;