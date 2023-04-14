const router = require('express').Router();
const { getIndex } = require('../controllers/content');
const { getLogin, login, logout, getRegister, register } = require('../controllers/users');
const isLoggedIn = require('../middleware/isLoggedIn');
const validateUser = require('../middleware/validateUser');
const tryCatch = require('../util/try-catch');

router.get('/', isLoggedIn, getIndex);

router.route('/login')
    .get(getLogin)
    .post(validateUser, tryCatch(login));

router.post('/logout', logout);

router.route('/register')
    .get(getRegister)
    .post(validateUser, tryCatch(register));

module.exports = router;