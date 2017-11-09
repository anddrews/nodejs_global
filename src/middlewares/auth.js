import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
	console.log('check auth middleware');
	next();
};