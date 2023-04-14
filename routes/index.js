const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('test');
});

router.get('/login', (req, res) => {
    res.render('pages/login');
});

module.exports = router;