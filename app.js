// use local env in dev mode
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); 
}

// define required vars
const express = require('express');
const path = require('path');

// config app
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

// import routes
const indexRoutes = require('./routes/index');

// config routes
app.use('/', indexRoutes);

app.listen(process.env.PORT, () => console.log('The server listens...'));