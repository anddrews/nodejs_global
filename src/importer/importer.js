import fs from 'fs';
import { promisify } from 'util';

export class Importer {
    constructor (watcher) {
        this.watcher = watcher;
        this.watcher.watch();
        this.files = [];
        this.watcher.on( 'changed', (err, e) => {
            this.files.put( e.path + '/' + e.fileName );
        });
    }
    
    import( path ) {
        const readFileAsync = promisify(fs.readFile);
        return readFileAsync(path);
    }
    
    
    
}