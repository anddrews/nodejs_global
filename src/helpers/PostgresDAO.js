import { Importer } from '../importer';
import { DirWatcher } from '../dirwatcher';
import _ from 'underscore';
import Pg from 'pg';
import { promisify } from 'util';

class DAO {
    constructor() {
        this.products = [];
        this.users = [{name: 'admin', password: 'qwerty', role: 'admin'}];
        let connectString = 'postgres://admin:qwerty@localhost:5433/nodejs';
        this.pg = new Pg.Client(connectString);
        pg.connect();
        // this.pg = pg;
	}
    
    getAllProducts() {
        return new Promise((resolve, reject) => {
            const dirwatcher = new DirWatcher('D:/Trainings/nodejs_global/data', 20);
            const importer = new Importer(dirwatcher);
            importer.getExistFile('products.csv').then((data) => {
                this.products = [...this.products, ...data];
                resolve(this.products);
            }).catch((err) => reject(err));
        })
    }
    
    getProductById(id) {
        return new Promise((resolve, reject) => {
            this.getAllProducts().then((data) => { resolve(_.filter(data, { id: id })[0])}).catch((err) => { reject(err)});
        });
    }
    
    getReviewsById(id) {
        return new Promise((resolve, reject) => {
            this.getAllProducts().then((data) => { resolve(_.filter(data, { id: id })[0].name)}).catch((err) => { reject(err)});
        });
    }
    
    addNewProduct(product) {
        return new Promise((resolve, reject) => {
            this.products = [...this.products, product];
            resolve(product);
        });
    }
    
    isExistId(id) {
        return new Promise((resolve, reject) => {
            this.getAllProducts().then((data) => {
                if(_.filter(data, { id: id }).length) {
                    resolve(true)
                } else {
                    reject(false)
                }
            }).catch((err) => { reject(err)});
        })
    }
    getUser(userName) {
        // return new Promise((resolve, reject) => {
         //    const currentUser = _.filter(this.users, { name: userName})[0];
         //    if(currentUser) {
         //        resolve(currentUser);
         //    } else {
         //        reject("user doesn't exist");
         //    }
		// })
        let c = [...arr];
        return this.pg.query(`select * from users where username = ${userName}`);
    
    }
}

export const dao = new DAO();