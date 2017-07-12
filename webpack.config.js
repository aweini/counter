const path = require('path');

let env = process.env.NODE_ENV;
console.log(env)
module.exports = require(path.resolve(__dirname, 'cfg', env));
