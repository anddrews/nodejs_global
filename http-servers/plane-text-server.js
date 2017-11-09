import http from 'http';

const server = http.createServer();

server.on('request', (req, res) => {
    res.writeHead( 200, {'Content-type': 'text/html'});
    res.end('Hello world');
});

server.listen(3000);
console.log('Server listens port 3000');
