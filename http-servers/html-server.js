import fs from 'fs';
import http from 'http';
import replace from 'stream-replace';
import * as config from '../config/config';
import minimist from 'minimist';

const server = http.createServer();

const minimistConfig = {
    alias: {
        'sync': 's'
    }
};
const args = minimist(process.argv.slice(2), minimistConfig);

if (args.sync) {
    server.on('request', (req, res) => {
        let syncReader = fs.readFileSync(config.htmlTemplatePath);
        syncReader = syncReader.toString().replace('{message}', 'Hello world');
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(syncReader);
    });
} else {
    server.on('request', (req, res) => {
        const streamReader = fs.createReadStream(config.htmlTemplatePath);
        res.writeHead(200, {'Content-type': 'text/html'});
        streamReader.pipe(replace('{message}', 'Hello world')).pipe(res);
    });
}

server.listen(3000);

console.log('Server listens port 3000');
