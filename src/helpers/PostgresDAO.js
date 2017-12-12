import _ from 'underscore';
import Pg from 'pg';
import Sequelize from 'sequelize';
import { Importer } from '../importer';
import { DirWatcher } from '../dirwatcher';
import * as config from '../../config/config.json';
import { User } from '../models/user';

// import { promisify } from 'util';

class DAO {
  constructor() {
    this.products = [];
    this.users = [{ name: 'admin', password: 'qwerty', role: 'admin' }];
    // const connectString = 'postgres://postgres:password@localhost:5430/nodejs_training';
    // const pg = new Pg.Client(connectString);
    // pg.connect();
    // pg.query('select * from users where id = 1').then(data => console.log(data)).catch( err => console.log('bad request'));
    const seq = new Sequelize(config.development);
    // seq.authenticate().then(() => console.log('postgres auth')).catch(err => console.log('error connection'));
    // seq.query('select * from users where id = 1').then(data => console.log(data)).catch(err => console.log(err));
    // console.log(new User(seq));
    // const user = new User(seq);
    // user.findOne({where: {id: 1}}).then(data => console.log(data.password)).catch(err => console.log('err'));
    this.sequelize = seq;
    // this.pg.connect();
    // this.pg = pg;
  }

  getAllProducts() {
    return new Promise((resolve, reject) => {
      const dirwatcher = new DirWatcher('D:/Trainings/nodejs_global/data', 20);
      const importer = new Importer(dirwatcher);
      importer.getExistFile('products.csv').then((data) => {
        this.products = [...this.products, ...data];
        resolve(this.products);
      }).catch(err => reject(err));
    });
  }

  getProductById(id) {
    return new Promise((resolve, reject) => {
      this.getAllProducts().then((data) => { resolve(_.filter(data, { id })[0]); }).catch((err) => { reject(err); });
    });
  }

  getReviewsById(id) {
    return new Promise((resolve, reject) => {
      this.getAllProducts().then((data) => { resolve(_.filter(data, { id })[0].name); }).catch((err) => { reject(err); });
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
        if (_.filter(data, { id }).length) {
          resolve(true);
        } else {
          reject(false);
        }
      }).catch((err) => { reject(err); });
    });
  }
  getUser(userName) {
    // return new Promise((resolve, reject) => {
    //    const currentUser = _.filter(this.users, { name: userName})[0];
    //    if(currentUser) {
    //        resolve(currentUser);
    //    } else {
    //        reject(user doesn't exist);
    //    }
    // })
    // return this.pg.query(`select * from users where username = ${userName}`);
    return new User(this.sequelize).findOne({ where: { userName } });

    // return this.sequelize.query('select * from users where username = admin');
  }
}

export const dao = new DAO();
