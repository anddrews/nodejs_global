import express from 'express'
import { daoMongo } from '../helpers/index';
import { productsMiddleware } from '../middlewares/index';

export const citiesRouter = express.Router();

// citiesRouter.use( productsMiddleware.extendReqNewProduct, productsMiddleware.isExistId, productsMiddleware.errorHandler);

citiesRouter.get('/', (req, res) => {
    daoMongo.getRandomCity()
        .then((data) => { res.status(200).end(JSON.stringify(data))})
        .catch((err) => {res.status(404).end('Something gone wrong')});
});

citiesRouter.get('/initializeDb', (req, res) => {
    daoMongo.setInitialData();
    res.status(200).end('Db created');
});
