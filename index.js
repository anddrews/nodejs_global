let config = require('./config/config');
let models = require('./models');

function main() {
    console.log(config.name);
    let user = new models.User();
    let product = new models.Product();
}

main();