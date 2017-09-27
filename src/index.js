import * as config from '../config/config';
import * as models from './models';
import { DirWatcher }from './dirwatcher';
import { Importer } from './importer';


console.log(config.name);
const user = new models.User();
const product = new models.Product();
const dirwatcher = new DirWatcher('D:/Trainings/nodejs_global/data', 2000);
const importer = new Importer(dirwatcher);
importer.import('run.bat').then((data) => console.log(data)).catch((err) => console.log(err));