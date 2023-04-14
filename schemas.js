const Joi = require('joi');

module.exports.userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).required();