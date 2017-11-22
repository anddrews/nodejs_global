import { Product } from '../models';
import { daoMongo as dao } from '../helpers';

export const productsMiddleware = {
    extendReqNewProduct: (req, res, next) => {
        const newProduct = new Product(req.body.id, req.body.name, req.body.brand, req.body.price, req.body.color, req.body.size);
        if(!newProduct) {
            next('Wrong data for model');
        } else {
            req.newItem = newProduct;
            res.status(404);
            next();
        }
    },
    isExistId: (req, res, next) => {
        const id = req.url.split('/')[1];
        if( id ) {
            if( !parseInt(id)) {
                console.log(req.url.split('/')[1]);
                next('Wrong Id');
            }
            dao.isExistId(id).then(() => next()).catch(() => {
                res.status(404);
                next('Wrong Id')
            });
        } else {
            next();
        }
    },
    extendObjectWithLastModifiedData: (req, res, next) => {
        if (req.method === 'POST' || req.method === 'PUT') {
            req.newItem.lastModifiedDate = new Date();
        }
        next();
    },
    errorHandler: (err, req, res, next ) => {
        next(err);
    }
};
