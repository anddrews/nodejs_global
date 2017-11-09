import express from 'express';
import * as config from '../../config/config.json';
import { dao } from '../helpers';
import jwt from 'jsonwebtoken';

export const authRouter = express.Router();

authRouter.post('/auth',(req, res) => {
	console.log('get auth request');
	dao.getUser(req.body.userName)
		.then((user) => {
		console.log(user);
			if(user.password === req.body.password) {
				const currentUser = {
					name: user.name,
					role: user.role
				};
				const token = jwt.sign(currentUser, config.jwtSecret);
				res.json({ code: 200, message: 'OK', token: 'JWT' + token});
			}
		})
		.catch((err) => {
		console.log(err);
			res.status(404).json({ status: 404, message: err});
		})
});



