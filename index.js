const _ = require('underscore')
const express = require('express');
const app = express.Router();


var result = _.contains([1,2,3], 2);
console.log(result)