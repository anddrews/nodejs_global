import express from 'express'
import { DAO } from '../helpers';

export const products = express.Router();
const dao = new DAO();

products.get('/api/products', (req, res) => {
    dao.getAllProducts().then((data) => { res.end(JSON.stringify(data))});
});

products.get('/api/products/:id', (req, res) => {
    dao.getProductById(req.params.id).then((data) => { res.end(JSON.stringify(data))});
});

products.get('/api/products/:id/reviews', (req, res) => {
    dao.getReviewsById(req.params.id).then((data) => { res.end(JSON.stringify(data))});
});

products.post('/api/products', (req, res) => {
    dao.addNewProduct(req.newProduct).then((data) => { res.end(JSON.stringify(data)) });
});