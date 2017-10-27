import fs from 'fs';
import http from 'http';
import replace from 'stream-replace';

const server = http.createServer();

console.log(process.argv);
server.on('request', (req, res) => {
    const streamReader = fs.createReadStream('./http-servers/index.html');
    const syncReader = fs.readFileSync('./http-servers/index.html');
    res.writeHead(200, {'Content-type': 'text/html'});
    streamReader.pipe(replace('{message}', 'Hello world')).pipe(res);
});

server.listen(3000);
console.log('Server listens port 3000');
