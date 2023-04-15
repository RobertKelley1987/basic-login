const { userSchema } = require('../schemas');
const ExpressError = require('../util/express-error');

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if(error) {
        const errorMessages = error.details.map(el => el.message).join(',');
        const src = req.path.slice(1, req.path.length);
        throw new ExpressError(400, errorMessages, 'VALIDATION_ERR', src);       
    } else {
        next();
    }
}

module.exports = validateUser;