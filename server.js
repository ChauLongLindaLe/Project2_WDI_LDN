//########################
//3rd- party dependencies
//########################

//express to manage the website
const express            = require('express');
// const expressLayouts     = require('express-ejs-layouts');
// const session            = require('express-session');
// const mongoose           = require('mongoose');
// const bodyParser         = require('body-parser');
// const router             = require('./config/router');
// const morgan             = require('morgan');




const app = express();


// configure express & layouts
// app.use(expressLayouts);
//
// app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);


// app.use(router);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`port ${PORT} is where it happens`));
