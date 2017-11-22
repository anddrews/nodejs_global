import express from 'express';
import cookieParser from 'cookie-parser';
import { productsRouter, usersRouter, citiesRouter } from './routes';
import { authRouter, isLoggedUser } from './middlewares';
import session from 'express-session';
import passport from 'passport';

export const app = express();



app.use(cookieParser(), express.urlencoded({ extended: true }));
app.use(session({
	secret: 'ilovescotchscotchyscotchscotch',
	resave: true,
	saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', authRouter);
app.use('/api/products', isLoggedUser, productsRouter);
app.use('/api/users',  isLoggedUser, usersRouter);
app.use('/api/cities', citiesRouter);
