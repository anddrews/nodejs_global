import * as config from '../config/config';
import * as models from './models';
import { DirWatcher }from './dirwatcher';

console.log(config.name);
const user = new models.User();
const product = new models.Product();
const dirwatcher = new DirWatcher('D:/Trainings/nodejs_global/data', 2000);
dirwatcher.watch( );
dirwatcher.on('changed', (err, e) => {
    console.log(e);
});
