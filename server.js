//########################
//3rd- party dependencies
//########################

//express to manage the website
const express            = require('express');
const expressLayouts     = require('express-ejs-layouts');
const mongoose           = require('mongoose');
const bodyParser         = require('body-parser');
const router = require('./config/router')



const app = express();



app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
