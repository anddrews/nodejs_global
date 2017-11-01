import express from 'express';
import cookieParser from 'cookie-parser';
import { products, users } from './routes';

export const app = express();
app.use(cookieParser());
app.use('/', products);
app.use('/', users);
