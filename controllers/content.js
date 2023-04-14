const User = require('../models/user');

exports.getIndex = async (req, res, next) => {
    const { email } = await User.findById(req.session.userId);
    // TODO: Fetch user content (ex: lists, photos) and return with render
    res.render('pages/home', { email });
}