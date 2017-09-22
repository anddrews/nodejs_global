import { EventEmitter } from 'events';
import fs from 'fs';

export class DirWatcher extends EventEmitter {
    constructor ( path, delay ) {
        super();
        this.delay = delay;
        this.path = path;
        this.fileName = '';
        this.event = null;
        this.counter = 0;
    }
    watch() {
        fs.watch( this.path, ( event, fileName ) => {
            this.fileName = fileName;
            this.event = event;
            const e = {
                eventName: this.event,
                path: this.path,
                fileName: this.fileName,
            };
            if ( event === 'change' && ++this.counter === 2 ) {
                setTimeout(() => {
                    this.counter = 0;
                    this.emit( 'changed', null, e);
                }, this.delay);
            }
        });
    }
}