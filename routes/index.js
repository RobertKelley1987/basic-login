const router = require('express').Router();
const tryCatch = require('../util/try-catch');
const User = require('../models/user');
const validateUser = require('../middleware/validateUser');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, async (req, res) => {
    const { email } = await User.findById(req.session.userId);
    res.render('pages/home', { email });
});

router.get('/login', (req, res) => res.render('pages/login'));

router.post('/login', validateUser, tryCatch(async (req, res) => {
        
}));

router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.redirect('/login');
});

router.get('/register', (req, res) => res.render('pages/register'));

router.post('/register', tryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    const newUser = new User({ email: email, password: password });
    await newUser.save();
    if(!newUser) {
        req.flash('error', 'Server error creating new user. Please try again.');
        return res.render('pages/register');
    }
    req.session.userId = newUser._id;
    res.render('pages/home', { email });
}));

module.exports = router;