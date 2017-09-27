import fs from 'fs';
import { promisify } from 'util';

export class Importer {
    constructor(dirWatcher) {
        this.dirWatcher = dirWatcher;
        this.asincReader = promisify(fs.readFile);
    }
    
    import(fileName) {
        this.dirWatcher.watch();
        return new Promise((resolve, reject) => {
            this.dirWatcher.on('changed', (err, res) => {
                if (err || res.fileList.indexOf(fileName) === -1) {
                    reject({err: 'file not found or other problem'});
                } else {
                    this.asincReader(res.dirPath + '/' + fileName)
                        .then((data) => resolve(data.toString()))
                        .catch(()=> reject({err: 'some problem in file reading'}));
                }
            })
        })
    }
}