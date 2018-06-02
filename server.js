//########################
//3rd- party dependencies
//########################

//express to manage the website
const express            = require('express');
const expressLayouts     = require('express-ejs-layouts');
const session             = require('express-session');
const bodyParser          = require('body-Parser');
const methodOverride      = require('method-override');
// const morgan              = require('morgan');

//database
const mongoose            = require('mongoose');
const router              = require('./config/router');
const User                = require('./models/user');

const {PORT, databaseURI} = require('./config/environment');
mongoose.connect(databaseURI);

mongoose.connect('mongodb://localhost/classes');

const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));


// app.use(morgan('dev'));
//body parser to translate form input
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride(req => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body)
}));



app.use(router);

//set port
const PORT = process.env.PORT || 8000;

//app to listen on port
app.listen(PORT, () => console.log(`port ${PORT} is where it happens`));
