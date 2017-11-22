import express from 'express'
import { daoMongo } from '../helpers';

export const usersRouter = express.Router();

usersRouter.get('/:name', (req, res,) => {
    daoMongo
        .getUser(req.params.name)
        .then( user => { res.status(200).json(user); console.log(user)})
        .catch(err => res.status(404).end('Somthing went wrong'));
});