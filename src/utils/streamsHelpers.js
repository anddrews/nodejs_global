import fs from 'fs';
import through2 from 'through2';
import split from 'split';
import Combine  from 'stream-combiner';
import request from 'request';
import path from 'path';

export class StreamsHelpers {
    constructor () {
        this.fileName = '';
        this.propsName = [];
        this.files = [];
        this.url = '';
        this.path = '';
    }
    
    readFromFile(fileName) {
        this.fileName = fileName;
        return fs.createReadStream(fileName);
    }
    
    writeToStdOut(){
        return process.stdout;
    }
    
    writeToFile(fileName) {
        let outFileName = '';
        if(fileName) {
            outFileName = fileName;
        } else {
            outFileName = this.fileName.substr(0, this.fileName.lastIndexOf(".")) + '.json';
        }
        return fs.createWriteStream(outFileName);
    }
    
    transformToUpperCase() {
        return through2(function (chunk, enc, callback) {
            chunk = chunk.toString().toUpperCase();
            this.push(chunk);
            callback();
        });
    }
    
    transformCsvToJSON () {
        let flag = 0;
        let self = this;
        return Combine(split(),through2(function (chunk, enc, callback) {
            if (!flag) {
                self.propsName = chunk.toString().split(',');
                flag ++;
                this.push('[');
            } else if(chunk.toString()) {
                chunk = self.csvStringToJSONString(chunk.toString());
                const splitter = flag++ === 1 ? '' : ',';
                this.push(splitter + JSON.stringify(chunk));
            } else {
                this.push(']')
            }
            callback();
        }));
        
    }
    
    cssBundler(paths, url) {
        this.path = paths;
        const writer = fs.createWriteStream(path.resolve(this.path, 'bundle.css'));
        this.url = url;
        fs.readdir(path.resolve(this.path), (err, files) => {
            this.files = files;
            this.readNextFile(writer);
        });
    }
    
    readNextFile(writeStream) {
        let reader;
        if(this.files.length) {
            reader = fs.createReadStream(path.resolve(this.path, this.files.shift()));
            reader.on('end', () => {
                this.readNextFile(writeStream);
            });
        } else {
            reader = request(this.url);
            reader.on('end', () => {
                writeStream.end();
            });
        }
        reader.pipe(writeStream,{ end: false });
    }
    
    csvStringToJSONString(str) {
        const regExpValue = /^(\d+),(".+"|.+),(".+"|.+),(".+"|.+),(\S\d+\.\d+),(\d+-\S+)$/;
        let result = {};
        this.propsName.forEach((el, index) => {
            result[el] = str.match(regExpValue)[index + 1].replace(/"/g,'');
        });
        return result;
    }
}