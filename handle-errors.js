const handleErrors = (err, req, res, next) => {
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

    if(err.src === 'login') {
        req.flash('error', 'Incorrect username or password.');
        return res.render('pages/login');
    }

    console.log(err);
}

module.exports = handleErrors;