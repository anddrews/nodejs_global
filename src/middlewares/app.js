import express from 'express';
import * as config from '../../config/config.json';
import { dao } from '../helpers';
import jwt from 'jsonwebtoken';

export const authRouter = express.Router();

authRouter.post('/auth',(req, res) => {
	dao.getUser(req.body.userName)
		.then((user) => {
			if(user.password === req.body.password) {
				const currentUser = {
					name: user.name,
					role: user.role
				};
				const token = jwt.sign(currentUser, config.jwtSecret);
				res.append('X-auth', token);
				res.json({ code: 200, message: 'OK', token: 'JWT ' + token});
			} else {
				res.status(403).json({ status: 403, message: 'Wrong credential'});
			}
		})
		.catch((err) => {
			res.status(404).json({ status: 404, message: err});
		})
});



