//########################
//3rd- party dependencies
//########################

//express to manage the website
const express            = require('express');
const expressLayouts     = require('express-ejs-layouts');
const session             = require('express-session');
const bodyParser          = require('body-Parser');
const methodOverride      = require('method-override');

//database
const mongoose            = require('mongoose');
const router              = require('./config/router');
const User                = require('./models/user');
mongoose.Promise = require('bluebird');

const {port, databaseURI} = require('./config/environment');
mongoose.connect(databaseURI);



const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));


//body parser to translate form input
app.use(bodyParser.urlencoded({ extended: true}));

app.use(methodOverride(req => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));



app.use(router);


//app to listen on port
app.listen(port, () => console.log(`port ${port} is where it happens`));
