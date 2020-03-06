const path = require('path');
const startupDebugging = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db')
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

const Validate = require('./router');

// app.use(express.json()); // instead I use bodyParser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));


// var result = _.contains([1,2,3], 2); // underscore module
// console.log(result)

// PORT
const PORT = process.env.PORT || 3000;
app.listen( PORT, () => console.log(`Listening port ${PORT}...`))