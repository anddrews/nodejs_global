import { Importer } from '../importer';
import { DirWatcher } from '../dirwatcher';
import _ from 'underscore';
import mongodb from 'mongodb';
import mongoose from 'mongoose';
import { City, Product, User } from '../mongooseModel';
import * as initialDbState from '../../data/mongoMockData.json';

class DAO {
    constructor() {
        this.products = [];
        let connectionStr = 'mongodb://localhost:27017/nodejs_mongo';
        // for native mongo driver
        // this.db = mongodb.MongoClient.connect(connectionStr);
        // this.db = mongoose.connection;
        mongoose.connect(connectionStr);
	}
    
    getAllProducts() {
        return Product.find({});
    }
    
    getProductById(id) {
        return Product.find( {id: id});
    }
    
    getReviewsById(id) {
        return Product.find({ id: id })
    }
    
    addNewProduct(product) {
        
        return new Promise((resolve, reject) => {
            // let newProduct = new Product(product);
            // newProduct.validate( err => {
            //     if (err) {
            //         console.log(err.message);
            //     } else {
            //         console.log('success');
            //     }
            // });
            new Product(product).save(err => {
                if(err) {
                    console.log();
                    reject('product not saved ' + err);
                } else {
                    console.log('product saved');
                    resolve(product);
                }
            })
        });
    }
    
    deleteProductById(id) {
        return Product.remove({ id: id});
    }
    
    isExistId(id) {
        return Product.find({id: id})
    }
    
    getUser(userName) {
        return User.find({ userName: userName });
    }
    
    getRandomCity() {
        // for native mongo driver
        // return this.db
        //     .then((db) => {
        //         return db.collection('cities')
        //             .findOne({ name: 'Gomel'});
        //     });
        
        return City.find({name: 'Gomel'})
    }
    
    setInitialData() {
        initialDbState.users.forEach( el =>  new User(el).save());
        initialDbState.products.forEach( el => new Product(el).save());
    }
}

export const daoMongo = new DAO();