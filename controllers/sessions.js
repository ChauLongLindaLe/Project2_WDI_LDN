const User = require('../models/user');

function newRoute(req, res){
  res.render('sessions/login');
}

function createRoute(req, res) {
  User
    .findOne({email: req.body.email })
    .then( (user)=>{
      if(!user || !user.validatePassword(req.body.password)){
        console.log('wrong password');
        return res.status(401).render('pages/login', {message: 'Unrecognised Credentials'});
      }
      req.session.userId = user.id;

      return res.redirect('/');
    });
}

function deleteRoute(req, res){
  return req.session.regenerate(() => res.redirect('/'));
}











module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
