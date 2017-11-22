import jwt from 'jsonwebtoken';
import * as config from '../../config/config.json';

export const isLoggedUser = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	const token = req.headers['x-auth'];
	jwt.verify(token, config.jwtSecret, function(err, payload) {
		if (err) {
			return res.json({ success: false, message: 'Failed to authenticate token. jwt verify' });
		} else {
			req.user = payload;
			next();
		}
	});
};