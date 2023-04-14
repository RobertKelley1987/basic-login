// use local env in dev mode
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); 
}

// define required vars
const express = require('express');
const path = require('path');
const connectToDb = require('./mongoose-config');
const session = require('express-session');
const flash = require('express-flash');
const handleErrors = require('./handle-errors');
const indexRoutes = require('./routes/index');

// connect to mongodb
connectToDb(); 

// config app
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(flash());
app.use('/', indexRoutes);

// config error handling
app.use(handleErrors);

// start app
app.listen(process.env.PORT, () => console.log('The server listens...'));