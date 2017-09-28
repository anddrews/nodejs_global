import * as config from '../config/config';
import * as models from './models';
import { DirWatcher }from './dirwatcher';
import { Importer } from './importer';


console.log(config.name);
const user = new models.User();
const product = new models.Product();
const dirwatcher = new DirWatcher(config.dataDir, config.delayDirWatching);
const importer = new Importer(dirwatcher);
importer.import('MOCK_DATA.csv').then((data) => console.log(data)).catch((err) => console.log(err));
dirwatcher.watch();
dirwatcher.on('changed', () => {
	console.log(importer.importSync());
});
