import express from 'express'
import { daoMongo as dao } from '../helpers';
import { productsMiddleware } from '../middlewares';

export const productsRouter = express.Router();

productsRouter.use( productsMiddleware.extendReqNewProduct, productsMiddleware.isExistId, productsMiddleware.errorHandler);

productsRouter.get('/', (req, res) => {
    dao.getAllProducts()
        .then((data) => { res.status(200).end(JSON.stringify(data))})
        .catch((err) => {res.status(404).end('Something gone wrong')});
});

productsRouter.get('/:id', (req, res) => {
    dao.getProductById(req.params.id)
        .then((data) => { res.status(200).json(data)})
        .catch((err) => {res.status(404).end('Something gone wrong')});
});

productsRouter.get('/:id/reviews', (req, res) => {
    dao.getReviewsById(req.params.id)
        .then((data) => { res.status(200).json(data)})
        .catch((err) => {res.status(404).end('Something gone wrong')});
});

productsRouter.post('/', (req, res) => {
    dao.addNewProduct(req.newProduct)
        .then((data) => { res.status(201).json(data) })
        .catch((err) => {res.status(404).end('Something gone wrong')});
});
productsRouter.delete('/:id', (req, res) => {
    dao.deleteProductById(req.params.id)
        .then((data) => { res.status(201).json('product was successful deleted' + data) })
        .catch((err) => {res.status(404).end('Something gone wrong')});
});