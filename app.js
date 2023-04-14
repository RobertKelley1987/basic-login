// use local env in dev mode
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); 
}

// define required vars
const express = require('express');
const path = require('path');
const connectToDb = require('./config-mongoose');
const session = require('express-session');
const flash = require('express-flash');

// config app
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(flash());

connectToDb();

// import and config routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// config error handling
app.use((err, req, res, next) => {
    if(err.errors) {
        const { email, password } = err.errors;
        if(email && email.kind === 'unique') {
            req.flash('error', 'An account with this email address already exists');
        }
        if(email && email.kind === 'required' || password && password.kind === 'required') {
            req.flash('error', 'Please provide both an email and password');
        }
        return res.render('pages/register');
    }

    console.log(err);
});

// start app
app.listen(process.env.PORT, () => console.log('The server listens...'));