const app = require('../app.js');
module.exports = app;
module.exports.handler = require('serverless-http')(app);