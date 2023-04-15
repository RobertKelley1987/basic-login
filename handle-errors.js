const handleErrors = (err, req, res, next) => {
    const { type, src, message } = err;
    const { email, password } = req.body;

    if(type === 'VALIDATION_ERR') {
        req.flash('error', message);
        return res.render(`pages/${src}`, { email, password });
    }

    if(message.includes('UNIQUE_VALIDATION_ERR')) {
        req.flash('error', 'An account using this email address already exists');
        return res.render('pages/register', { email, password });
    }

    console.log('ERROR MESSAGE: ' + err.message);
    console.log(err);
}

module.exports = handleErrors;