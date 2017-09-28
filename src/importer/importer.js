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
                console.log(res.fileList);
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
        let totalData = [];
        for (let i = 0; i < files.length; i++) {
            totalData = totalData.concat(utils.csvtojson(fs.readFileSync(`${path}\\${files[i]}`, {encoding: "utf-8"})));
            console.log(totalData)
        }
        return totalData;
        
        
    }
}