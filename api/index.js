const app = require('../app');
module.exports = app;
module.exports.handler = require('serverless-http')(app);