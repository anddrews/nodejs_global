import express from 'express'

export const usersRouter = express.Router();

usersRouter.get('/', (req, res,) => {
    res.status(200).end('Users');
});