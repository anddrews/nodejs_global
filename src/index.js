import * as config from '../config/config';
import * as models from './models';
import { DirWatcher }from './dirwatcher';
import { Importer } from './importer';

console.log(config.name);
const user = new models.User();
const product = new models.Product();
const dirwatcher = new DirWatcher('E:/Trainings/nodejs_global/nodejs_global/data', 2000);
const fr = new Importer(dirwatcher);
// dirwatcher.watch( );
// dirwatcher.on('changed', (err, e) => {
//     console.log(e);
// });
fr.import('E:/Trainings/nodejs_global/nodejs_global/data/log.txt').then((data) => console.log( 'then ' + data)).catch((err) => console.log( 'catch ' + err));
