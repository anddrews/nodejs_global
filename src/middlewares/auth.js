import jwt from 'jsonwebtoken';
import * as config from '../../config/config.json';

export const checkAuth = (req, res, next) => {
	const token = req.headers['x-auth'];
	jwt.verify(token, config.jwtSecret, function(err, decoded) {
		if (err) {
			return res.json({ success: false, message: 'Failed to authenticate token.' });
		} else {
			req.decoded = decoded;
			next();
		}
	});
};