import http from 'http';

const product = {id: 1,name: 'Supreme T-Shirt',brand: 'Supreme',price: 99.99,options: [{ color: 'blue'},{ size: 'XL'}]};
const server = http.createServer();

server.on('request', (req, res) => {
    res.writeHead( 200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(product));
});

server.listen(3000);
console.log('Server listens port 3000');
