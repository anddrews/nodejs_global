import express from 'express';
import cookieParser from 'cookie-parser';
import { productsRouter, usersRouter } from './routes';
import { authRouter, checkAuthJWT } from './middlewares';

export const app = express();

app.use(cookieParser(), express.urlencoded({ extended: true }));
app.use('/', authRouter);
app.use('/api/products', checkAuthJWT, productsRouter);
app.use('/api/users', checkAuthJWT, usersRouter);
