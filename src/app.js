import express from 'express';
import cookieParser from 'cookie-parser';
import { productsRouter, usersRouter } from './routes';
import { authRouter } from './middlewares';
import { checkAuth } from './middlewares';
export const app = express();

app.use(cookieParser(), express.urlencoded({ extended: true }));
app.use('/', authRouter);
app.use('/api/products', checkAuth, productsRouter);
app.use('/api/users', checkAuth, usersRouter);
