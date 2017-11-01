import express from 'express';
import { products } from '../routes';
import { Product } from '../models';

products.use(express.urlencoded());

products.use((req, res, next) => {
    console.log('sdfsdf');
    const newProduct = new Product(req.body.id, req.body.name, req.body.brand, req.body.price, req.body.color, req.body.size);
    req.newProduct = newProduct;
    next();
});