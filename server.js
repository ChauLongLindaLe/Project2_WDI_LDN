//########################
//3rd- party dependencies
//########################

//express to manage the website
const express            = require('express');
const expressLayouts     = require('express-ejs-layouts');
const session             = require('express-session');
const bodyParser          = require('body-Parser');
const methodOverride      = require('method-override');
const morgan              = require('morgan');
//database
const mongoose            = require('mongoose');
const router              = require('./config/router');
const User                = require('./models/user');
mongoose.Promise = require('bluebird');
//flash, userAuth, key to encrypt session

const {port, databaseURI} = require('./config/environment');
mongoose.connect(databaseURI);

const app = express();

app.use(expressLayouts);
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));



app.use(bodyParser.urlencoded({ extended: true}));

app.use(methodOverride(req => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  if(!req.session.userId) return next();
  User
    .findById(req.session.userId)
    // .populate({path: 'classes', populate: {path: 'creator'}})
    // .exec()
    .then((user) =>{
      req.session.userId._id = user._id;
      res.locals.user = user;
      res.locals.isLoggedIn = true;
      next();
    });
});


app.use(router);


//app to listen on port
app.listen(port, () => console.log(`port ${port} is where it happens`));
