const { userSchema } = require('../schemas');
const ExpressError = require('../util/express-error');

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if(error) {
        const errorMessages = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, errorMessages);       
    } else {
        next();
    }
}

module.exports = validateUser;