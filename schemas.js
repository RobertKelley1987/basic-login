const Joi = require('joi');

exports.userSchema = Joi.object({
    email: Joi.string().email().required().error(errs => {
        const err = errs[0];
        switch (err.code) {
            case 'string.email': 
                err.message = 'Please provide a valid email address.';
                break;
            case 'string.required':
            case 'string.empty':
                err.message = 'Please provide an email address to continue.';
                break;
            default:
                break;
        }
        return err;
    }),
    password: Joi.string().required().error(errs => {
        const err = errs[0];
        if(err.code === 'string.empty' || err.code === 'string.required') {
            err.message = 'Please provide a password to continue.'
        }
        return err;
    })
}).required();