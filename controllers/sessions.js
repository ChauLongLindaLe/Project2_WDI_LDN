const User = require('../models/user');

function sessionsNew(req, res){
  res.render('sessions/login');
}

//login authentication
function sessionsCreate(req, res) {
  User
    .findOne({email: req.body.email })
    .then((user)=>{
      if(!user || !user.validatePassword(req.body.password)){
        console.log('wrong password');
        return res.status(401).render('sessions/login', {message: 'Unrecognised Credentials'});
      }
      req.session.userId = user.id;
      return res.redirect('/');
    });
}

//logout function - regenerate session cookie
function sessionsDelete(req, res){
  return req.session.regenerate(() => res.redirect('sessions/logout'));
}


module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
