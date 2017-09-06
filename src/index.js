import * as config from '../config/config';
import { User, Product } from './models/index';

function main() {
    console.log(config.name);
    let user = new User();
    let product = new Product();
}

main();