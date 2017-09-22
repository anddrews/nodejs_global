import * as config from '../config/config';
import * as models from './models';
import { DirWatcher }from './dirwatcher';
import { Importer } from './importer';

console.log(config.name);
const user = new models.User();
const product = new models.Product();
const dirwatcher = new DirWatcher('D:/Trainings/nodejs_global/data', 2000);
// dirwatcher.watch( );
const fr = new Importer(dirwatcher);
dirwatcher.on('changed', (err, e) => {
    console.log(e);
});
fr.import('D:/Trainings/nodejs_global/data/run.bat').then((data) => console.log( 'then ' + data)).catch((err) => console.log( 'catch ' + err));
