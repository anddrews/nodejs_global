import fs from 'fs';
import { promisify } from 'util';
import { JSONConverter } from '../helpers';

export class Importer {
    constructor(dirWatcher) {
        this.dirWatcher = dirWatcher;
        this.asincReader = promisify(fs.readFile);
        this.converter = new JSONConverter();
    }
    
    import(fileName) {
        this.dirWatcher.watch();
        return new Promise((resolve, reject) => {
            this.dirWatcher.on('changed', (err, res) => {
                if (err || res.fileList.indexOf(fileName) === -1) {
                    reject({err: 'file not found or other problem'});
                } else {
                    this.asincReader(res.dirPath + '/' + fileName)
                        .then((data) => resolve(this.converter.toJSON(data.toString())))
                        .catch(()=> reject({err: 'some problem in file reading'}));
                }
            })
        })
    }
    importSync() {
        return this.dirWatcher.files.reduce((totalData, fileName) =>
            totalData.concat(this.converter.toJSON(fs.readFileSync(this.dirWatcher.path + '/' + fileName, {encoding: "utf-8"} ))), []);
    }
}