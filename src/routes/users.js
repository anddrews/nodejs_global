import express from 'express'

export const users = express.Router();

users.get('/api/users', (req, res,) => {
    res.end('Users');
});