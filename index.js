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

// set the view engin to ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

const Validate = require('./router');
const courses = require('./routes/courses');
const indexPage = require('./routes/home');
const logger = require('./middleware/logger')

// app.use(express.json()); // instead I use bodyParser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/home', indexPage);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if( app.get('env') === 'development') {
  app.use(morgan('tiny'));
  // console.log("Morgan enabled...");
 startupDebugging('Morgan enabled...')
}

// to run debugger type the follow ing command "export DEBUG=app:db"
dbDebugger('Connected ot the database!!!');

app.use(Validate.Log)
app.use(Validate.Authenticate)
app.use(logger)

// var result = _.contains([1,2,3], 2); // underscore module
// console.log(result)

// declaring PORT
const PORT = process.env.PORT || 3000;
app.listen( PORT, () => console.log(`Listening port ${PORT}...`))