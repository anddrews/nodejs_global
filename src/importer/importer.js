import fs from 'fs';
import { promisify } from 'util';

export class Importer {
    constructot (watcher) {
        this.watcher = watcher;
        this.watcher.watch();
        this.files = [];
        console.log('this watcher');
        this.watcher.on( 'changed', (err, e) => {
            this.files.put( e.path + '/' + e.fileName );
            console.log('importer event');
        });
    }
    
    import( path ) {
        const readFileAsync = promisify(fs.readFile);
        return readFileAsync(path);
        
    }
    
    
    
}