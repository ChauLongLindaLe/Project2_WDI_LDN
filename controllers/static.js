const User = require('../models/user');

function indexRoute(req, res) {
  User
    .find()
    .exec()
    .then((users) => res.render('index', { users }));
}

module.exports = {
  index: indexRoute
};
