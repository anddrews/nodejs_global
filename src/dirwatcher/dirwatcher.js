import { EventEmitter } from 'events';
import fs from 'fs';

export class DirWatcher extends EventEmitter {
    constructor ( path, delay ) {
        super();
        this.delay = delay;
        this.path = path;
        this.files = [];
        this.event = null;
        this.counter = 0;
        this.watcher = null;
        this.isDirChanged = false;
    }
    watch() {
        if(!this.watcher) {
            this.watcher = fs.watch(this.path, (e, fileName) => {
                if (e === 'change' && ++this.counter === 2) {
                    this.files.push(fileName);
                    this.isDirChanged = true;
                    this.counter = 0;
                }
            })
        }
        setInterval(()=> {
            if(this.isDirChanged) {
                const returnedObj = {
                    dirPath: this.path,
                    fileList: this.files
                };
                this.emit('changed', null, returnedObj);
                this.isDirChanged = false;
            }
        }, this.delay);
    }
}