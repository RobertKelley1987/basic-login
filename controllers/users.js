const bcrypt = require('bcrypt');
const ExpressError = require('../util/express-error');
const User = require('../models/user');

exports.getLogin = (req, res) => res.render('pages/login');

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if(!foundUser) {
        throw new ExpressError(400, 'Incorrect username or password.', 'login');
    } 
    const passwordMatch = await bcrypt.compare(password, foundUser.password)
    if(!passwordMatch) {
        throw new ExpressError(400, 'Incorrect username or password.', 'login');
    }
    req.session.userId = foundUser._id;
    res.redirect('/');
}

exports.logout = (req, res) => {
    req.session.userId = null;
    res.redirect('/login');
}

exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    const newUser = new User({ email: email, password: password });
    await newUser.save();
    if(!newUser) {
        req.flash('error', 'Sorry, we had a server error! Please try again.');
        return res.render('pages/register');
    }
    req.session.userId = newUser._id;
    res.redirect('/');
}

exports.getRegister = (req, res) => res.render('pages/register');