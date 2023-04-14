const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// define user schema
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// before each save, hash any password changes
userSchema.pre('save', async function(next) {
    if(!this.isModified) {
        return next();
    } else {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
});

userSchema.plugin(uniqueValidator); // plugin validates original usernames

module.exports = mongoose.model('User', userSchema);