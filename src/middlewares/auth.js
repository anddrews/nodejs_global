import jwt from 'jsonwebtoken';
import * as config from '../../config/config.json';

export const checkAuthJWT = (req, res, next) => {
	const token = req.headers['x-auth'];
	jwt.verify(token, config.jwtSecret, function(err, payload) {
		if (err) {
			return res.json({ success: false, message: 'Failed to authenticate token.' });
		} else {
			req.user = payload;
			next();
		}
	});
};